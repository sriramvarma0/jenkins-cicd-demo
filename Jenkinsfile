pipeline {
  agent any

  environment {
    DOCKERHUB_REPO = 'sriramvarma0/jenkins-cicd-demo' // change if different
    GIT_SHORT_SHA  = "${env.GIT_COMMIT?.take(7) ?: 'dev'}"
  }

  tools { nodejs 'Node20' }

  options { timestamps(); ansiColor('xterm') }

  triggers { pollSCM('H/2 * * * *') }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install & Test') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
            sh 'npm test'
          } else {
            bat 'npm ci'
            bat 'npm test'
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          def tagLatest = "${DOCKERHUB_REPO}:latest"
          def tagSha    = "${DOCKERHUB_REPO}:${GIT_SHORT_SHA}"
          if (isUnix()) {
            sh "docker build -t ${tagLatest} -t ${tagSha} ."
          } else {
            bat "docker build -t ${tagLatest} -t ${tagSha} ."
          }
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                          usernameVariable: 'DH_USER',
                                          passwordVariable: 'DH_PASS')]) {
          script {
            def tagLatest = "${DOCKERHUB_REPO}:latest"
            def tagSha    = "${DOCKERHUB_REPO}:${GIT_SHORT_SHA}"
            if (isUnix()) {
              sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
              sh "docker push ${tagLatest}"
              sh "docker push ${tagSha}"
            } else {
              bat 'echo %DH_PASS% | docker login -u %DH_USER% --password-stdin'
              bat "docker push ${tagLatest}"
              bat "docker push ${tagSha}"
            }
          }
        }
      }
    }

    stage('Deploy (demo)') {
      when { expression { return params.DEPLOY?.toBoolean() } }
      steps {
        script {
          def image = "${DOCKERHUB_REPO}:${GIT_SHORT_SHA}"
          if (isUnix()) {
            sh "docker rm -f jenkins-cicd-demo || true"
            sh "docker run -d --name jenkins-cicd-demo -p 3000:3000 ${image}"
          } else {
            bat "docker rm -f jenkins-cicd-demo || ver > nul"
            bat "docker run -d --name jenkins-cicd-demo -p 3000:3000 ${image}"
          }
        }
      }
    }
  }
}
