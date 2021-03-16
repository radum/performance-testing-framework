FROM jenkins/jenkins:lts-slim

# This is needed to be able to load Sitespeed.io reports within Jenkins. More info can be found on Sitespeed.io website.
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false -Dhudson.model.DirectoryBrowserSupport.CSP=\"sandbox allow-scripts; style-src 'unsafe-inline' *;script-src 'unsafe-inline' *;\""
COPY security.groovy /usr/share/jenkins/ref/init.groovy.d/security.groovy
COPY configure-markup-formatter.groovy /usr/share/jenkins/ref/init.groovy.d/configure-markup-formatter.groovy
COPY jobs/ /jobs/
COPY run.sh /run.sh
COPY error_parsing /error_parsing
COPY hudson.plugins.logparser.LogParserPublisher.xml /var/jenkins_home/hudson.plugins.logparser.LogParserPublisher.xml
COPY plugins.txt /usr/share/jenkins/ref/
# Taken from http://localhost:8181/jnlpJars/jenkins-cli.jar
COPY jenkins-cli.jar /usr/share/jenkins/ref/

USER root

# Install the latest Docker CE binaries and add user `jenkins` to the docker group
RUN apt-get update && \
    apt-get -y install apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common && \
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
      $(lsb_release -cs) \
      stable" && \
    apt-get update && \
    apt-get -y install docker-ce && \
    usermod -aG docker jenkins

# Install docker-compose.
# We’ll check the [current release](https://github.com/docker/compose/releases) and if necessary, update it in the command below:
RUN curl -L https://github.com/docker/compose/releases/download/1.26.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

# # Install latest chrome stable package to be used with LHCI.
# # https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/recipes/docker-client/Dockerfile
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update
# RUN apt-get install -y google-chrome-stable --no-install-recommends

RUN xargs /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt && \
apt-get -y install sudo && \
sudo usermod -aG staff jenkins && \
echo "jenkins ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# TODO: I don't think this is needed anymore
ENV PATH "$PATH:/usr/local/bin/dind/"

# Drop back to the regular jenkins user - good practice
USER jenkins

ENTRYPOINT ["bash","-x","/run.sh"]
