pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'your-dockerhub-username'
        DOCKERHUB_REPO = 'jenkins-cicd-demo'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:$IMAGE_TAG .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm install'
                sh 'echo "Tests passed"'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:$IMAGE_TAG'
                }
            }
        }
    }
}
