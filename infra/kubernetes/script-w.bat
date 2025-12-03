kubectl create configmap nginx-config --from-file=default.conf=../docker/backend/nginx/default.conf

kubectl apply -f static-pvc.yaml

kubectl apply -f worker/deployment.yaml

kubectl apply -f rabbitmq/deployment.yaml
kubectl apply -f rabbitmq/service.yaml

kubectl apply -f server/deployment.yaml
kubectl apply -f server/service.yaml

kubectl apply -f frontend/deployment.yaml
kubectl apply -f frontend/service.yaml

kubectl apply -f nginx/deployment.yaml
kubectl apply -f nginx/service.yaml
