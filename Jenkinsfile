pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'sriramvarma0'  // change this
        IMAGE_NAME = 'jenkins-cicd-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sriramvarma0/jenkins-cicd-demo.git'
            }
        }

        stage('Build Node.js App') {
            steps {
                sh '''
                echo "📦 Installing dependencies..."
                npm install
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                echo "🐳 Building Docker image..."
                docker build -t $DOCKERHUB_USER/$IMAGE_NAME:latest .
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo "🔑 Logging into DockerHub..."
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    echo "📤 Pushing image to DockerHub..."
                    docker push $DOCKERHUB_USER/$IMAGE_NAME:latest
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & push completed successfully!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
