kubectl apply -f deployment/frontend-deployment.yaml
kubectl apply -f deployment/nginx-deployment.yaml
kubectl apply -f deployment/rabbitmq-deployment.yaml
kubectl apply -f deployment/server-deployment.yaml
kubectl apply -f deployment/worker-deployment.yaml

kubectl apply -f services/frontend-service.yaml
kubectl apply -f services/nginx-service.yaml
kubectl apply -f services/rabbitmq-service.yaml
kubectl apply -f services/server-service.yaml
kubectl apply -f services/worker-service.yaml

kubectl apply -f static-pvc.yaml