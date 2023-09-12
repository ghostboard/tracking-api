aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 858957275565.dkr.ecr.eu-west-1.amazonaws.com
docker buildx build --platform=linux/arm64 -t tracking-api . --no-cache
docker tag tracking-api:latest 858957275565.dkr.ecr.eu-west-1.amazonaws.com/tracking-api:production
docker push 858957275565.dkr.ecr.eu-west-1.amazonaws.com/tracking-api:production
aws ecs update-service --cluster tracking-api-prod --service tracking-api-prod --region eu-west-1 --force-new-deployment