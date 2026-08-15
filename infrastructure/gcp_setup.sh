#!/usr/bin/env bash
# Chittakala - Google Cloud Platform Setup & Cloud Run Deployment Script
set -e

# Configuration
PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "chittakala-dev")
REGION="us-central1"
SERVICE_NAME="chittakala-api"
BUCKET_NAME="${PROJECT_ID}-user-drawings"

echo "=== 1. Enabling Required GCP APIs ==="
gcloud services enable \
    run.googleapis.com \
    firestore.googleapis.com \
    storage.googleapis.com \
    aiplatform.googleapis.com \
    secretmanager.googleapis.com \
    cloudbuild.googleapis.com \
    --project "${PROJECT_ID}"

echo "=== 2. Provisioning Private Cloud Storage Bucket ==="
if gsutil ls -b "gs://${BUCKET_NAME}" >/dev/null 2>&1; then
    echo "Bucket gs://${BUCKET_NAME} already exists."
else
    gsutil mb -p "${PROJECT_ID}" -l "${REGION}" -b on "gs://${BUCKET_NAME}"
    echo "Created bucket gs://${BUCKET_NAME} with uniform bucket-level access."
fi

echo "=== 3. Deploying FastAPI to Google Cloud Run (Scale to Zero) ==="
# Deploy with --min-instances=0 so idle cost is $0.00!
gcloud run deploy "${SERVICE_NAME}" \
    --source . \
    --region "${REGION}" \
    --project "${PROJECT_ID}" \
    --allow-unauthenticated \
    --min-instances=0 \
    --max-instances=5 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars "GCS_BUCKET_NAME=${BUCKET_NAME}"

echo "=== 4. Cloud Run Service URL ==="
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" --platform managed --region "${REGION}" --project "${PROJECT_ID}" --format 'value(status.url)')
echo "Chittakala API is LIVE at: ${SERVICE_URL}"
echo "Health Check: ${SERVICE_URL}/health"
