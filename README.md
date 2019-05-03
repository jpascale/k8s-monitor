# k8s-monitor
A self hosted alerting service

Project under development.

# Deployment
kubectl create configmap k8s-monitor-config --from-file=k8s-monitor-config.json -n production
kubectl apply -f k8s-monitor.yaml

# Build locally
docker build -t k8s-monitor .
docker run -it --name k8s-monitor --network host -v $(pwd):/home/k8s-monitor k8s-monitor -- "node build/index.js k8s-monitor-config.json"
docker stop -s INT k8s-monitor

# Configure new relic monitoring
kubectl create secret generic newrelic-token --from-literal key=XXXXX

# Contact
jpascale@itba.edu.ar
