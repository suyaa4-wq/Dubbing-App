FROM gitpod/workspace-full:latest

USER gitpod

# Install ffmpeg and other needed packages
RUN sudo apt-get update && sudo apt-get install -y ffmpeg wget unzip build-essential

# (Optional) Install OpenJDK if you plan to use Android SDK tools on the workspace
RUN sudo apt-get install -y openjdk-17-jdk

ENV ANDROID_HOME=/home/gitpod/android-sdk
ENV PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
