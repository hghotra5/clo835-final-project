1. Setup the Kubernetes Environment
Start Minikube:
minikube start --cpus=4 --memory=4096

Create a Namespace:
kubectl create namespace fullstack-app

2. Containerize the Application


Frontend (Nginx): 

docker build -t hghotra5/frontend .
docker push <your-dockerhub-username>/frontend


Backend (Node.js):

docker build -t hghotra5/nodejs-backend .
docker push hghotra5/backend

3. Create Kubernetes Manifests

Create Persistent Volume and Persistent Volume Claim for MongoDB:

kubectl apply -f mongo-pv.yaml -n fullstack-app
kubectl apply -f mongo-pvc.yaml -n fullstack-app


Create ConfigMap for MongoDB Connection String:
kubectl apply -f mongo-configmap.yaml -n fullstack-app


Create Kubernetes Secret for MongoDB Credentials:
kubectl apply -f mongo-secret.yaml -n fullstack-app

Deploy MongoDB:
kubectl apply -f mongo-deployment.yaml -n fullstack-app

Deploy Node.js Backend:
kubectl apply -f nodejs-deployment.yaml -n fullstack-app

Deploy Nginx Frontend:
kubectl apply -f nginx-deployment.yaml -n fullstack-app

expose services
kubectl expose deployment mongo-deployment --name=mongo-svc --port=27017 --target-port=27017 -n fullstack-app
kubectl expose deployment nodejs-deployment --name=nodejs-svc --port=3000 --target-port=3000 -n fullstack-app
kubectl expose deployment nginx-deployment --name=nginx-svc --type=NodePort --port=80 --target-port=80 -n fullstack-app

4. application managment

   Scale Deployments:


kubectl scale deployment/nodejs-deployment --replicas=3 -n fullstack-app
kubectl scale deployment/nginx-deployment --replicas=3 -n fullstack-app

Monitor Logs:
kubectl logs -f deployment/nodejs-deployment -n fullstack-app

Port Forwarding to Access MongoDB Locally:
kubectl port-forward svc/mongo-svc 27017:27017 -n fullstack-app

Rolling Updates for Node.js Deployment:
kubectl set image deployment/nodejs-deployment nodejs=<new-image> -n fullstack-app
