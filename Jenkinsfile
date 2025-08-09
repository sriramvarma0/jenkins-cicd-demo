pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'your-dockerhub-username'      // Change this
        DOCKERHUB_REPO = 'jenkins-cicd-demo'            // Change if repo name different
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "📦 Building Docker image..."
                    sh 'docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:$IMAGE_TAG .'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "🧪 Running tests..."
                    sh 'npm install'
                    sh 'echo "✅ All tests passed (placeholder)"'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    echo "🚀 Pushing image to DockerHub..."
                }
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:$IMAGE_TAG'
                }
            }
        }
    }
}
