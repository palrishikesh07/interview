Certified Kubernetes for Application Developer

Hands-on LAB --- AWS account -- VMs

Docker (Containers workflow) -- CLI on VM

k8 cluster -- 3 VMs ( 1 Vm -- t2.large (40GB) , 2 VMs --- t2.medium = (20GB) each )

    Kubernetes  ---    Containers    +    Orchestration


    Containers  ---  lightweight in nature, it is a portable way to bind multiple lib/depnd into one unit

                       -- instances of image (read-only)


        Image  -- 5 layers  (Read-only)

        Container 1 -- 6 layers --  5 image layers +  1 extra layer (R/W layer)  (ephermal) -- temporary

        contaier2 --  new data


        LAptop -- OS (Windows 10/11)

        Host machine  --- OS installed   (crash)  ---  install OS again

                                    Ubuntu OS   -- create a bootable pen drive   (ISO file -- image of OS)

                                  C drive  --

        Host machine --- Instance of Image



    Docker images  ---  ubuntu, nginx

        (Dockerfile  -- custom image  (base image ubuntu)

        docker build -t my-image .


        docker push/pull the images to dockerhub ...

Scenario --

Host machine (Windows) -- 8 core CPU and 16 GB RAM, SSD -- 2 TB

Openstack/Vmware

Type-2 hypervisors -- Vmware workstation

tell you 3 Vms -- windows , ubuntu , centos

Vm 1 -- 2 vcpu + 8 GB RAM (windows) -- ISO file , storage -- 256 GB

Vm2 and Vm3

vm1 -- power on

Iso file -- 3-4 GB size

Virtualization -- Vms are heavyweight

Guest OS -- ISO file -- (Kernel + Lib/depend + GUI drivers etc)

Containerization --

**Containers share the kernel with host OS**

Mini OS -- (Lib/depnd + GUI drivers etc)

Docker Desktop -- Windows

employ 1, emply 2 , employ 3

(manager -- udemy subs.. -- (udemy account))

work on CKAD course -- udemy course

running container in my docker in Ubuntu VM -- share ?

image out of it --- share image

Have your account in dockerhub

docker login

docker push/pull command

dockerhub (storage images in repos)

ECR -- AWS

ACR -- Azure

GCP -- registry

=============================================================================================================  
 Type-1 hypervisors -

Data Centers ( Servers -- attached with LAN cables ) -- Multiple VMs are hosted

Racks -- place bare metal server + Electric Power connectivity + LAN cables (10 Gbps)

AWS -- purchase -- bare metal server -- computing power (32 Vcpu + 128 GB RAM) -- box ---

Connect this with Monitor --

ISO file of type 1 hypervisor ( divide current spec into mulr=tiple VMs --

                                                               16 Vms ( 2 vcpu + 8 GB ram )

                                                               Vm 1 -- 192.168.2.0   (username + pswd)
                                                               Vm 16 -- !92.168.2.15  (username + pswd)

Training course -- Vms

================================================================================================================

AWS account -- Free tier ( 12 months)

t2.micro/t3.micro -- instance free tier -- 75-0 hrs per months

t2.medium and t2.large

t2.micro -- after 7 days -- 92 USD

Task 1 -- Create an AWS account .

Task 2 -- Create a Budget .

Task 3 -- Create a VM (ec2) --- (ECC -- Elastic Compute Cloud) -- VM

> > name -- docker VM

> > OS -- Ubuntu 24.04

> > size = t2.medium

> > storage = 20 GB

> > Key-pair to SSH (create key-pair) -- RSA and .pem

> > Security-group -- allow 22 port (ssh)

after this, SSH into VM -

SSH (22) -- get inside a Linux VM

Windows -- RDP (3389) -- go inside Windows VM

Syntax to SSH

ssh -i "key-pair-name" ubuntu@<public-ip>

Command to SSH : ssh -i ajit-key.pem ubuntu@54.82.57.238

Once connected --

> > whoami

> > cat /etc/os-release

> > sudo hostnamectl set-hostname docker-vm ( To change the existing hostname)

> > bash

ubuntu@ip-172.17.0.1 --- docker -vm

install docker using this script :

      (Follow step-by-step instructions)

1. Update system & install prerequisites

sudo apt update && sudo apt install -y ca-certificates curl gnupg

2.  Create keyrings directory

sudo install -m 0755 -d /etc/apt/keyrings

3.  Add Docker’s official GPG key

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg

4.  Add Docker repository (Ubuntu 24.04 – noble)

echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu noble stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

5.  Update package list

sudo apt update

6.  Install Docker

sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

7.  Verify Docker is working

docker --version

=========================================================================================================

Org-- Gaming application

users -- ( US and UK)

host application -- US and UK

-- to reduce the latency and gice a better exp. to users
-- to regulators compliance
-- all services are not available in all regions

-- aws 200+ regions

-- N.Virginia (us-east-1) -- six Azs

(H.A.)

===========================================================================================================

sudo --- to get high privileges

to use commands directly --

1. sudo usermod -aG docker $USER --- ( change the prsmission of ubuntu - giving the full acess over docker group)

2. newgrp docker ( create a group named docker)

docker ps (list of running containers)

docker images (list of images present locally)

> > docker run hello-world (normal mode)

3 operations -- pull image from library (dockerhub) + create and start a container

(docker pull hello-world (only pull images from dockerhub)

docker craete hello-world (create a container of hello-world image (random name)

docker start <cont-id> (it will start the container)

Problem -- docker ps -a (show the container is exited)

> > they will display a message on terminal and exit out ... occpy the terminal

> > running in forground mode

=================================================================================================================

    Docker Containers :

    ** Multiple Modes**

    1. Normal Mode (Foreground Mode)
    In normal mode, a container runs in the foreground, and you can see its output in your terminal.
    The command to start the container is simply run with the docker run command.

> > docker run ubuntu

This will run an Ubuntu container and show the container's output in your terminal.
The container's main process runs in the foreground.
This is useful for simple commands or when you want to see the output directly.

2.  Detached Mode (Daemon Mode)

In detached mode, the container runs in the background, allowing you to continue using the terminal.
The container starts and runs in the background without blocking your terminal.

> > docker run -dt ubuntu

The -d flag stands for "detached", which makes the container run in the background.
The container will keep running until you explicitly stop it.
You can list all running containers with docker ps.

To interact with the container after it has started, you can attach to it or run commands in it using:

> > docker exec -it <container_id> bash

3. Interactive Mode

In interactive mode, you run the container in the foreground but with the ability to interact with it, typically by opening a terminal session inside the container.

> > docker run -it ubuntu bash

The -i flag stands for "interactive", and the -t flag allocates a terminal.
This will run the Ubuntu container and open a bash shell inside it, so you can run commands interactively.

The container will remain running as long as you are inside the terminal session. Once you exit, the container will stop.

If you want to exit out of container terminal, without stopping the container ... cntrl+pq is used ...

if you exit command .. it will stop the containers ...

    1  docker ps
    2  docker images
    3  docker run hello-world
    4  docker images
    5  docker ps
    6  docker ps -a
    7  docker create hello-world
    8  docker ps
    9  docker ps -a

10 docker start heuristic_swirles
11 docker ps -a
12 clear
13 docker run --name cont1 -dt ubuntu
14 docker ps
15 docker exec -it e3ca8bc63511 bash
16 docker ps
17 pwd
18 ls
19 echo "this is demofile" > demo
20 ls
21 cat demo
22 pwd
23 docker exec -it e3ca8bc63511 bash
24 pwd
25 ls
26 clear
27 docker run --name -it ubuntu bash
28 docker run --name cont2 -it ubuntu bash
29 docker ps -a
30 docker run --name cont3 -it ubuntu bash
31 docker ps -a
32 clear
33 history

                           (stop)                                         (disk -- active )
        VM  -- t2.medium (CPU+ memory)  + SSD (20 gb disk)

==============================================================================================

memory swap

memory -- 512 GB (RAM)

memoy swap -- 1024 MB -- (space on ssd disk) -- temporary

8 Gb + 8 Gb (stoarge)

docker run --name c11 -dt -p 81:80 nginx

docker run -d -p host-port:container-port nginx

nginx -- webserver (80)

34 clear
35 docker stats
36 docker run --name cont-memory -dt --memory="512m" ubuntu
37 docker stats
38 docker ps
39 docker inspect cont3
40 clear
41 docker inspect cont-memory
42 clear
43 docker inspect cont-memory | grep 'Memory"
44 docker inspect cont-memory | grep "Memory"
45 docker inspect cont-memory | grep 'IP'
46 clear
47 docker run -d --name nginx-container -p 81:80 nginx
48 docker ps
49 clear
50 docker run -d --name httpd-container -p 82:80 httpd
51 git clone https://github.com/ajit010/My-Docker-App.git
52 clear
53 ls
54 cd My-Docker-App/
55 ls
56 cat Dockerfile
57 docker build -t my-app .
58 clear
59 docker images
60 docker run -d --name myapp-container -p 84:8080 myapp
61 docker run -d --name myapp-container -p 84:8080 my-app
62 docker ps
63 clear
64 ls
65 cat app.py
66 cd templates/
67 ls
68 nano index.html
69 cat index.html
70 clear
71 cd ..
72 docker build -t my-app:v2 .
73 docker ps
74 docker images
75 docker run -d --name myapp-container2 -p 85:8080 my-app:v2
76 history

Control Groups (Cgroups) :

Control Groups (cgroups) in Docker are a Linux kernel feature that allows you to allocate and limit resources (CPU, memory, disk I/O, etc.) to processes running on your system.

In Docker, cgroups are used to manage the resources available to containers, helping ensure that each container gets the resources it needs while preventing any single container from overusing system resources.

When you create a Docker container, you can specify limits on various resources like CPU and memory.

These limits are enforced using cgroups. You can configure these limits when running the container using the docker run command.

Types of Resources Managed by cgroups:

    CPU: Controls the CPU time that a container can use.
    Memory: Limits the amount of RAM a container can use.
    Disk I/O: Controls the disk read/write rate for containers.
    Block I/O: Controls the block device I/O for containers (e.g., limiting disk throughput).

Specifying Resource Limits for Containers:

Here are a few common ways to specify resource limits for Docker containers:

1. Limiting Memory Usage

You can limit the memory that a container can use by setting the --memory option. If the container exceeds the allocated memory, it may be killed by the Docker engine.

> > docker run -dt --memory="512m" ubuntu
> > --memory="512m" limits the container to 512 MB of RAM.

If the container tries to use more than the allocated memory, it will be stopped by Docker.

2. Limiting CPU Usage
   You can limit the CPU usage by using the --cpus option to set the number of CPU cores the container can use.

> > docker run -dt --cpus="1.5" ubuntu
> > --cpus="1.5" allows the container to use up to 1.5 CPU cores.

3. Limiting Disk I/O  
   You can set disk I/O limits for a container using the --device-read-bps and --device-write-bps options to limit the read and write speed of a container on a specific device.

> > docker run -dt --device-read-bps /dev/xvda:1mb --device-write-bps /dev/xvda:1mb ubuntu
> > This limits the container's read and write speeds on /dev/sda to 1 MB per second.

4. Setting Storage Limits (Disk Space)
   To limit the amount of storage available to a container, you can use volume mounts and set size limits for the volumes.

However, Docker doesn’t directly support setting disk storage limits in the container runtime, but you can use tmpfs (in-memory file system) for temporary file storage.

> > docker run -dt --tmpfs /tmp:size=100m ubuntu

--tmpfs /tmp:size=100m mounts the /tmp directory in the container as a temporary in-memory filesystem and limits it to 100 MB.

==================================================================================================================================

        >> Cgroups  -- Use to Limit Cpus and Memory allocated to each container ..

        Cgroups -- Container Control Groups

        (Cgroups is a feature of linux inherited by docker to apply on containers)

        Create two containers  --

        >> Container 1  --  Set a limit of memory of 512m

        docker run -dt --name limitedmemory --memory='512m' ubuntu

        docker inspect limitedmemory

        (Inspect command will give you a lot of details)

        (To filter out the results -- you can use 'grep' against your commands)

        >> Container 2 -- Set a limit of Cpus of 0.25 each

        Check using "docker inspect command" to limit applied

        Important commands like --

        >> docker info

        >> docker system df

        >> docker prune  (it is used to deleted unused resources -- destructive command)

        >> docker stats (to find out current usage by image and containers)

===========================================================================================================

Docker Port Mapping ::

sudo docker run --name c11 -dt -p 81:80 nginx

sudo docker run --name c12 -dt -p 82:80 httpd

Execute these two commands to run conatiners

Dockerfile --

https://github.com/ajit010/My-Docker-App.git

Step 1: Creating a Dockerfile

A Dockerfile is a script that contains instructions on how to build a Docker image.

Create a Project Folder:

1. Create a directory where you will store your project files:

> > mkdir docker-labcd docker-lab

2. Create a Dockerfile

   Create a file named Dockerfile (no extension) inside the docker-lab folder.

> > touch Dockerfile

3. Define the Dockerfile

   Edit the Dockerfile using any text editor (e.g., nano or vim):

   nano Dockerfile

   Paste the following content into the Dockerfile:

# Step 1: Use an official base image

FROM ubuntu:latest

# Step 2: Install dependencies (e.g., curl and vim)

RUN apt-get update && apt-get install -y curl vim

# Step 3: Create a directory inside the container

RUN mkdir -p /app

# Step 4: Set the working directory

WORKDIR /app

# Step 5: Copy files from the host system to the container

COPY . /app

# Step 6: Expose port 8080

EXPOSE 8080

# Step 7: Define the default command

CMD ["bash"]

Explanation of the Dockerfile:

FROM: Specifies the base image (ubuntu:latest).

RUN: Runs commands inside the container (e.g., updating package list and installing curl/vim).

WORKDIR: Defines the working directory inside the container.

COPY: Copies files from the host machine into the container.

EXPOSE: Exposes a port (useful for networking).

CMD: Defines the default command to run when the container starts (in this case, bash).

Step 2: Building the Docker Image

Now that the Dockerfile is ready, let’s build the Docker image using the docker build command.

1. Build the Image

> > docker build -t myapp .

-t myapp: Names the image myapp.

. : -- Specifies the build context (current directory).

2.  Verify the Image
    After the image is built, check the image list:

docker images

You should see the myapp image listed.
To Push Images to DockerHub :

     >> First go to hub.docker.com

     >> Sign in using creds ...  -- Generate PAT (personal access token)  -- >  scope --   read and write

     >> USe these commands in terminal :

        docker login -u "your-dockerhub-username'

        paste your PAT here

        >> Login success

Two commands :

    -- docker tag <your-image>    <dockerhub-username>/<your-image>

      docker tag my-app:v2 ajit0101/my-app:v2          (Tag image --- create a new repo)

    -- docker push  <new-name-name-after-tag>

      docker push  ajit0101/my-app

=============================================================================================================

Docker Volumes -- Container FileSystem and Persistence

Concepts :

> > Containers are ephermal
> > Containers filesystem = writable layer
> > Deleted Containers = Deleted data
> > Containers -- if you put database there -- need data persistance

          nginx   -- (frontend)           db -- mysql (data) -- persisted



              storing details of customer

              sign up  -- login  (user not found)

--- Docker volumes -- 3 types

1.  tmpfs -- temporary filesystem (lost when container is deleted)

Step 1 -- Create an Ubuntu Container :

    >> docker run -it --name fs-test ubuntu bash

Step 2 -- Create a file :

    >> mkdir /data
    >> echo "Important Data" > /data/info.txt

Step 3 -- Exit Container :

    exit

Step 4 -- Restart Container :

    >> docker start fs-test

> > docker attach fs-test

Check :

    cat /data/info.txt

    (File exists   --- When we restarted the container, the file is persisted)

Step 5 -- Remove Container :

    >> docker rm -f fs-test

Step 6 -- Create a new container :

> > docker run -it --name fs-test ubuntu bash

Step 7 -- Check data :

    ls /data

(Directory doesn't exit --- data does not persisted after deleting the container)

Data must live outside the containers --- Volumes

2.  Docker Volumes (Named Volumes -- Persistent Data)

## -- Volumes live outside container

Directory -- /var/lib/docker

Step 1 -- Create a Named Volume

> > docker volume create mydata

List Volumes :

> > docker volume ls

Inspect :

> > docker volume inspect mydata

-- Physical location managed by Docker (Host Machine)
-- Not inside Container FS

(Map the location of this volume to container FS)

Step 2 -- Attach Volume to a container :

    >> docker run -it --name vol-test -v mydata:/data ubuntu bash

    Inside Container :

    echo "Persistent Data" > /data/info.txt
    cat /data/info.txt
    exit

Step 3 -- Delete the container : >> docker rm vol-test

Step 4 -- Resuse the volume in new container :

    >> docker run -it --name vol-test2 -v mydata:/data ubuntu bash

    mydata  -- volume managed by docker

    /data   -- if this directory isn't present --- container FS will create and it data from volume will be copied to this directory of FS

    Inside Container :

    >> cat /data/info.txt

(Persistent data)

> > Data still exists
> > Old container deleted, new container persisted data via volumes

===============================================================================================================

Docker run
(craete containers)

Detached Mode --- docker run -d nginx

docker attach <cont-name> ---- used when interactiveness is already given

docker exec -it <cont-name> bash --- (work when cont initially create using detached mode)

Interactive mode :

     docker run -it ubuntu bash

     docker attach <cont-name>

> > create a container using detached mode --

(Try to go inside terminal)

> > create a container using interactive mode (it will directly take you inside terminal)

-dt (detach + terminal) -it (interactivness + terminal) --- open the terminal

Created container using interactive mode

Inside terminal -- exit (stop the container)

cntrl + pq (read escape sequence)

103 docker stats --- (Used to check the current resource usage by each container)
104 df -h (diskspace usage of host machine)
105 df
106 clear
107 docker system df (docker images, containers usage space)
108 docker ps
109 clear
110 docker stop `docker ps -aq`
111 docker rm `docker ps -aq`
112 docker ps -a
113 docker images
114 docker rmi `docker images`
115 clear
116 docker images
117 docker system df
118 clear
119 docker ps
120 history

==============================================================================================================

Docker Networking --

-- Each container has its own network namespace
-- Default bridge network
-- User defined network provides -- DNS + isolation

<< Containers communicate using container names , not IPs>>

Multi-containers --

fronend -- backend -- database

3-tier architecture

Step 1 -- Create a network :

    >> docker network create mynet

    >> docker network ls

    >> docker network inspect mynet

Look out -- subnet, gateway, driver=bridge, containers = {}

Step 2 -- Create two containers on same network :

> > docker run -dit --name c1 --network mynet ubuntu bash

> > docker run -dit --name c2 --network mynet ubuntu bash

Step 3 - Test the connectivity :

    >> docker attach c1

    >> ping c2

    -- ping command not found

    (>> apt update -y
    >> apt install iputils-ping -y)

> > ping c2 (Response back)

> > ping <cont-name-not-on-same-network> (error for name resolution)

==========================================================================================================

Create a K8 Cluster :

      k8 cluster using 3 nodes :


          (OS -- Ubuntu 24.04   same for all three VMs)

        Vm 1 -- Master node  -- t2.large ( 2 vCPU + 8 GB RAM )  -- storage -- 30 GB  --

        Vm 2 -- Worker Node 1 -- t2.medium  ( 2 vCPU + 4 GB RAM)   -- stoarge 20 GB

        Vm 3 -- Worker Node 2 -- t2.medium  ( 2 vCPU + 4 GB RAM)   -- stoarge 20 GB

(If t2.large or t2.medium is not available in your aws account (free tier), choose instance maches configuration (2 vcpu + 4 GB) etc relevant to specific types)

After creating all VMs, ssh into each of them .. change their hostname to master, worker1 and worker2

> > Command to ssh -- ssh -i <key-pair-name> ubuntu@<public-ip> (Use this for all three VMs)

change the hostname command --- sudo hostnamectl set-hostname <name>  
 --- bash

Follow the script given in repo -- step by step

(https://github.com/ajit010/CKAD-repo----23-27-.git)

Step 1.. Create a script.sh file on all three Vms

> >            "sh script.sh"      ---          to execute the script

(It will install all the required components on all three VMs)

Step 2 --- create a config.yaml file in MASTER NODE only ...

(Make the required modification in advertiseAddress to replace it with your master node private ip and then save the file)

Step 3 -- Initiate the cluster -- MASTER NODE only ...

kubeadm init

                   (Ignore the warnings)

Step 4 --- After completing step 3 .. you will get output file -- "cluster_initialized.txt"

           Once you open this file, it will have output details of cluster initialization -- token command etc

Step 5 -- Use these 3 commands together in MASTER NODE Only ..

          mkdir -p $HOME/.kube
          sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
          sudo chown $(id -u):$(id -g) $HOME/.kube/config


    Step 6 -- Install the calico plugin (MASTER NODE) only..


    kubectl apply -f

    Step 7  -- Use command "kubectl get nodes"  (MASTER NODE)

            you wil get one ndoe -- master -- REady  (only single node is part of cluster)

    Step 8 -- Join worker Nodes  :

        you will get these join command with token --  "open the cluster_initialized.txt file"

(This command has to be executed to worker nodes (DO NOT USE IT ON MASTER NODE) )

(Be the root user in worker node 1 and node 2)

      kubeadm join 172.31.21.57:6443 --token q0yf44.mzld1pjild4u3soe \
        --discovery-token-ca-cert-hash sha256:f9ac0fc4577c1f6a15a1e755e511d51a5b62d8afc5e07f003d30f8172febbc09 \
        --cri-socket unix:///var/run/cri-dockerd.sock

> > Once cluster is successfully setup, try this command on master node and this output is expected ...

ubuntu@master:~$ kubectl get nodes
NAME STATUS ROLES AGE VERSION
master Ready control-plane 13m v1.33.5
worker1 Ready <none> 48s v1.33.5
worker2 Ready <none> 33s v1.33.5

==========================================================================================================

1.27 or 1.28 --

k8 cluster -- master node and 2 worker node

Next morning -- kubectl get nodes ( Error localhost:6443 not fund) --- (1st scenario)

Cluster is created -- /etc/kubernetes

manifests files -- componenets are required to keep cluster running

kube-scheduler, controller-manager, kubeapiserver, etcd etc

kube config file not present

config not present in corect location ........

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

> > kubectl get nodes

2nd scenario -- Port issue or Ip address issue

                        (Worker and Master node have required port no. open in Security GRoup)

                        Ip address -- start cluster,  next day -- error

                        config.yaml

                      *maybe used public-ip in config file and it is changed next day  (possible case)

============================================================================================================

Kubernetes Architecture :

       (Control-Plane)

       --- Kubernetes API-server  (Heart of k8)  (6443)

       Everyone talks to API-server

        >>  kubectl get nodes

        -- Three nodes
        (Master, worker1, worker2)



       --- ETCD   ---  Key-value store  (database stores the state of cluster --- nodes part of machine, aps deployed)  (2379-2380)

       etcd backup n restore

       Multiple Master Nodes

       Pods, Deployments, Configmaps, Secrets etc

       If you delete etcd, your cluster forget everything ...


       In company -- HR records



       --- Scheduler   -- which worker node should run the pod ?

                   Docker -- host Vm -- docker run ubuntu

                   kubectl run pod1 --image=nginx     -- Pod  (a container of image nginx)

                   ( 3 nodes in 1 master , worker 1 and worker 2 )

       Algos --

       Worker node which has higher spec (space left)

       -- Nod CPU, memory availability,  Taint , Node conditions



       --- Controller-Manager  (brain of k8)

       replicaset -- desired state --  replicaset-controller, deployment-controller

       -- Kubeadm

       (Init the cluster , join worker nodes ------ reset the cluster)

       -- Kubelet

       (agent -- present on each node machine -- kubelet is to create container in Pod and make sure it stays alive)

       -- Kubectl

       (command line utility to get info about cluster)

       ex.  kubectl get nodes
              kubectl cluster-info

       -- Container Runtime

       (Actually place which is responsible to run the containers

         containerd , docker -- deprecated )


    Flow --

    kubectl run pod1 --image=nginx

    Create a pod --- API Server stores -- ETCD -- Schedular assigns node (node1)  -- kubelet tell container runtime --
    container runtime pull image from dockerhub --- Created  -- start a container




     PODS --

     >> Smallest deployable unit in k8

     IT has
     -- one or more containers
     -- shared network
     --shared storage



    An E-comerce Company (XYZ)

    -- Developers write microservices (cart, payment, orders etc)

    --   these services must run on many servers

    --  Something/Someone must manage :

        -- where apps will run
        -- how many replicas will run
        -- restart failed app
        -- network comminication


        (kubernetes will manage all these things for you)

Control-plane -- The management office
(makes decisions)

-- accepting request, decide where to run containers, maintain cluster state

Worker Nodes -- Employees working on projects

-- Run your containers
--handle traffic n execute workloads

> > Payment microservice container runs in a pod

    pod gives -- a single ip, localhost, volume

Single Container Pod -- nginx container

(One container per pod, best for most microservices)

Multi Container Pod -- (share network n storage)

Runs a web app -- main container + sidecar container (read logs , send logs to monitoring system)

share volume -- emptyDir volume

docker -- ephermal -- tmpfs -- survices till the container lasts

POD lifecycle :

    Pending
    Running
    Succeeded
    Failed
    Unknown



    You deploy app  -- Image pulled -- pending
    container start -- Running
    JOb finished -- Succeeded


    Restart Policies :

        restartPolicy: Always | Never | OnFailure

        Always -- default (Deployments)
        OnFailure -- JObs
        Never -- Debugging

initContainers :

       -- these run before main container

       First initContainer completed, then main container will start


       App needs DB ready

       Init Container --

        Wait for DB

        Main app will start

SideCar Containers --

         -- Running alongside main container

         -- Logging, Monitoring etc

================================================================================================================

    To set k as shorcuut for kubectl :

    echo "alias k=kubectl" >> ~/.bashrc
    source ~/.bashrc

===============================================================================================================

LAB 1 -- Basic Pod Creation :

         Topics -- Pod Creation, Imperative vs Declarative, Pod exposure, Pod deletion

         Part 1 : Create a Pod using imperative command :

             >> kubectl run nginx-pod --image=nginx

             >> kubectl get pods

             >> kubectl describe pod nginx-pod
     (It will give you Pod IP, Container Image, Events etc )


          Part 2 : Create Pod using YAML (Declarative)

               To generate YAML first (easy trick)  (template)

               >> kubectl run nginx-yaml --image=nginx --dry-run=client  -o yaml  > pod-temp.yaml

               >> nano pod-temp.yaml

                 (labels :
                      app: web)

        >> kubectl apply -f pod-temp.yaml

        >> kubectl get pods --show-labels




          Part 3 : Expose Pod

          Expose using ClusterIP, NodePort -- (port mapping in docker)

> > kubectl expose pod nginx-yaml --port=80 --name=nginx-service

(If you have multi-container-pod ...... target port =8080

cont 1-- port =8080 (target port)
cont 2 - port 9000 (target port)

> > kubectl get svc (Cluster-IP)

Test Internally :

> > kubectl run test-pod --image=busybox -it --rm -- sh

(Inside terminal)

> > wget -qO- http://nginx-service

(DNS inside cluster, service name resolves automatically)

Part 4 : Delete Pod

> > kubectl delete pod nginx-pod (single pod)

> > kubectl delete pods --all (delete all pods at once)

         (If this pod is created via replicaset or deployment .... it will be recreated)

==============================================================================================================================

        LAB 2 -- Multi-Container Pod  (SideCar Pattern)


        Topics -- share network, share volume, communicate via localhost


        Task 1 --  Create a yaml file :



            version  1

apiVersion: v1
kind: Pod
metadata:
name: multi-container-pod
spec:
volumes:

- name: shared-data
  emptyDir: {}

containers:

- name: nginx-container
  image: nginx
  volumeMounts:
  - name: shared-data
    mountPath: /usr/share/nginx/html

- name: busybox-sidecar
  image: busybox
  command: ["/bin/sh"]
  args: ["-c", "while true; do echo Hello from Sidecar $(date) >> /data/index.html; sleep 5; done"]
  volumeMounts:
  - name: shared-data
    mountPath: /data

> > kubectl apply -f <<name-of-file>

multi-container pod will be created

> > kubectl logs <<name-of-pod>> -c <container-name>

(Display the logs -- it is in version 2
version 2 -- logs , storing in /data/index.html )

> > kubectl exec -it <<name-of-pod>> -c <<name-of-container> -- sh

> > cd /data

> > cat index.html

version 2 ----

apiVersion: v1
kind: Pod
metadata:
name: multi-container-pod
spec:
volumes:

- name: shared-data
  emptyDir: {}

containers:

- name: nginx-container
  image: nginx
  volumeMounts:
  - name: shared-data
    mountPath: /usr/share/nginx/html

- name: busybox-sidecar
  image: busybox
  command: ["/bin/sh"]
  args:
  - -c
  - |
    while true; do
    echo Hello from Sidecar $(date) | tee -a /data/index.html
    sleep 5
    done
    volumeMounts:
  - name: shared-data
    mountPath: /data

> > kubectl apply -f multi-pod.yaml

> > kubectl logs multi-container-pod -c busybox-sidecar

(give you direct logs)

you can -f flag for follow mode

Main app -- writes logs
Sidecar -- processes logs

Used in :

> Logging Systems, Monitoring etc

> > kubectl logs command will display that into terminal

=====================================================================================================================================

IMP Command --- 1. kubectl api-resources (kind of object, object shornames, apiVersion of object)

     2. kubectl cluster-info            -- info about cluster  (ip address n port of api-server)

                                   3. kubectl config view             (current namespace, context info)

=====================================================================================================================================

LAB 3 -- Deployments

Topics -- ReplicaSet, Scaling, Rolling Update, Recreate

Workloads --

> > ReplicaSets -- X no. of identical pods running

Scenario --

e-commerce application -- microservices

payment --- 3 replicas running (3 pods -- replicaset)

if 1 die -- create a new (maintain desired no. of replicas)

ReplicaSet

rs.yaml

# A simple replicaset definition file with a template of pod and 3 replicas.

apiVersion: apps/v1
kind: ReplicaSet
metadata:
name: myapp-replicaset
labels:
app: myapp
spec:
selector:
matchLabels:
app: myapp
replicas: 3
template:
metadata:
name: nginx-2
labels:
app: myapp
spec:
containers: - name: nginx
image: nginx

> > kubectl create -f <name-of-file>

(Make change in replicas count in yaml file)

kubectl replace -f <<name-of-file>>

Other way :

    kubectl scale --replicas=2 rs <name-of-rs>

137 kubectl api-resources
138 clear
139 kubectl cluster-info
140 kubectl config view
141 clear
142 nano rs.yaml
143 kubectl get nodes
144 k get nodes
145 echo "alias k=kubectl" >> ~/.bashrc
146 k get nodes
147 clear
148 k apply -f rs.yaml
149 k get rs
150 k get pods
151 k delete pod myapp-replicaset-cjmxl
152 k get pods
153 clear
154 ls
155 k get rs
156 nano rs.yaml
157 kubectl replace -f rs.yaml
158 k get rs
159 kubectl describe rs myapp-replicaset
160 clear
161 kubectl get pods
162 k get rs

164 kubectl scale --replicas=2 rs myapp-replicaset
165 k get rs
166 cat rs.yaml
167 clear
168 history

==============================================================================================================================

> > Deployment

nano deploy.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
name: myapp-deployment
labels:
tier: frontend
app: nginx
spec:
selector:
matchLabels:
app: myapp
replicas: 3
template:
metadata:
name: nginx-2
labels:
app: myapp
spec:
containers: - name: nginx
image: nginx

> > kubectl create -f deploy.yaml

(It will create a deployment, with a replicaset and desired no. of replicas)

if you use --record here, it will be visible in change-cause

> > kubectl rollout status deploy/myapp-deployment

> > kubectl rollout history deploy/myapp-deployment

In CKAD -- Deployment is the most important object

It manges :

    -- ReplicaSets, Rolling UPdates, Rollback

(you should never create replicasets manually)
(always use deployments)

Scenario : Version 1 of payment service running

                   deploy version 2

    Deployment -- new replicaset

                  -- gradually shifs traffic to newer version

    Rolling Updates (Default Strategy)

    Gradually :

        -- Create new pods, Delete old pods
        -- Zero downtime

      Real Example :

          3 replicas running. you update image

          Kubernetes :
              -- starts 1 new pod
              -- waits healthy
              -- deletes 1 old pod
              -- repeats

        -- Users will see no downtime


        Rollbacks

        If update fails :
            > kubectl rollout undo deployment <deploy-name>

        Rolls back to previous working version.


       Scenario :
           Version 2 has bug --- 500 internal error
           you rollback -- service restored in seconds


         Scaling

         >> kubectl scale deployment <deploy-name> --replicas=6

Deployment via Imperative Commands :

    (Create Deployment)
    >> kubectl create deploy web-deploy --image=nginx --replicas=3


    (Inspect Details)
    >> kubectl get deployments
    >> kubectl get pods
    >> kubectl get rs

    Deployment --- manages ReplicaSet --- manages Pods


    (Scale Deployment)
    >> kubectl scale deployment web-deploy --replicas=6
    >> kubectl get pods


    (Rolling Updates)
    >> kubectl set image deployment/web-deploy nginx=nginx:1.29

    (Watch Rollout)
    >> kubectl rollout status deployment/web-deploy

    (Check History)
    >> kubectl rollout history deployment/web-deploy

    (Rollback)
    >> kubectl rollout undo deployment/web-deploy

    (Verify)

> > kubectl describe deployment web-deploy

    Command History :

172 nano deploy.yaml
173 cat deploy.yaml
174 kubectl create -f deploy.yaml
176 k get deploy
177 k get rs
178 k get pods
179 k get deploy
180 k get all
187 kubectl get deploy
188 kubectl get rs
189 kubectl get pods
190 clear
191 kubectl get deploy
192 k describe deploy myapp-deployment
193 clear
194 kubectl rollout status deploy/myapp-deployment
195 kubectl rollout history deploy/myapp-deployment
196 k get deploy
197 k delete deploy myapp-deployment
198 kubectl create -f deploy.yaml
199 kubectl rollout status deploy/myapp-deployment
200 k delete deploy myapp-deployment
201 kubectl create -f deploy.yaml
202 k delete deploy myapp-deployment
203 clear
204 kubectl create -f deploy.yaml --record
205 kubectl rollout status deploy/myapp-deployment
206 kubectl rollout history deploy/myapp-deployment
207 k describe deploy
208 cleaer
209 clear
210 nano deploy.yaml
211 k replace -f deploy.yaml
212 k get pods
213 k get rs
214 k describe deploy
215 clear
216 kubectl rollout history deploy/myapp-deployment
217 kubectl rollout undo deploy/myapp-deploy
218 kubectl rollout undo deploy/myapp-deployment
219 kubectl rollout history deploy/myapp-deployment
220 k describe deploy
221 clear
222 kubectl create deploy web-deploy --image=nginx --replicas=3
223 k get deploy
224 kubectl create deploy web-deploy --image=nginx --replicas=3 --dry-run=client -o yaml
225 kubectl create deploy web-deploy --image=nginx --replicas=3 --dry-run=client -o json
226 kubectl create deploy web-deploy --image=nginx --replicas=3 --dry-run=client -o json > mydeploy.json
227 clear
228 ls
229 cat mydeploy.json
230 clear
231 k get deploy
232 k describe web-deploy
233 k describe eploy web-deploy
234 k describe deploy web-deploy
235 clear
236 kubectl set image deployment/web-deploy nginx=nginx:1.29
237 k describe deploy web-deploy
238 clear
239 k edit deploy web-deploy
240 k describe deploy web-deploy
241 k edit deploy web-deploy
242 clear
243 k describe deploy web-deploy
244 clear
245 kubectl set image deployment/web-deploy nginx=nginx:1.29
246 k describe deploy web-deploy
247 clear
248 k get deploy
249 k describe deploy web-deploy
250 history

================================================================================================================

    LAB 4 -- Namespaces and Context


    Theory part :

    Namespaces --  Logical isolation inside same cluster


    Scenario :

    Same cluster used by:

Dev Team
QA Team
Production

    Instead of 3 clusters, use 3 namespaces:
        dev
        qa
        prod


    (Creating Namespace)
    >> kubectl create namespace dev

    (Switching Context)
    >> kubectl config set-context --current --namespace=dev

Resource Isolation Concept :

You can:
Limit CPU
Limit Memory
Restrict access (RBAC)
Separate environments

    Real Scenario :

Dev namespace:
2 CPU max
4GB RAM

Prod namespace:
No limit
(So dev cannot overload cluster.)

    Practical Part :


        (Create Namespaces)

> > kubectl create namespace dev
> > kubectl create namespace prod

> > kubectl get ns

    (Deploy in dev Namespace)

> > kubectl create deployment dev-app --image=nginx -n dev

> > kubectl get pods -n dev

    (Deploy in prod Namespace)

> > kubectl create deployment prod-app --image=nginx -n prod

> > kubectl get pods -n prod

    (Switch Namespace)     --  **Very Important for CKAD**

> > kubectl config set-context --current --namespace=dev

> > kubectl get pods
> > (It shows only dev pods.)

(Switch back)

> > kubectl config set-context --current --namespace=default

Real-World Scenario ::

Single cluster
Multiple teams
Each namespace = environment

=================================================================================================================

    LAB 5 – Imperative Command Mastery (CRITICAL FOR CKAD)

    (Generate Deployment YAML)

kubectl create deployment nginx-deploy --image=nginx --dry-run=client -o yaml > deploy.yaml

Open file:

nano deploy.yaml

    Modify:

replicas: 3
Add labels
Add resource limits

Example:

resources:
requests:
memory: "64Mi"
cpu: "250m"
limits:
memory: "128Mi"
cpu: "500m"

> > kubectl apply -f deploy.yaml

> > kubectl describe deployment nginx-deploy

    Generate a pod template via imperative coomand :

        >>  kubectl run test-pod --image=nginx --dry-run=client -o yaml > test-demo.yaml


    To work on service (ClusterIP) :

       >>  kubectl expose deploy nginx-deploy --port=80 --type=ClusterIP --dry-run=client -o yaml


    ================================================================================================================


    LAB 1 to 5 :

        >> Create Pods and Debug Pods
        >> Create multi-container Pods, initContainers, SideCar
        >> Understood share volumes and share localhost
        >> Create Deployment (ReplicaSet), Scaling, Rolling Update, RollBack
        >> Work with namespaces
        >> Generate YAML from imperative commands (using dry-run commands)

================================================================================================================

    Scenario 1 ::  Image Pull Error

    Create this pod :

apiVersion: v1
kind: Pod
metadata:
name: my-pod
labels:
app: nginx
spec:
containers: - name: demoapp
image: nginx:67.1 (wrong tag for image doesn't exist)

    Describe command in Pod  --  Events section

    (Make the required change of correct image tag and then apply)

    >> kubectl get pods

    (Debugging Steps)

    kubectl edit pod <pod-name>

    save and exit ..

    Now you wills ee , pod is in "running" state ...




    Scenario 2 :: CrashLoopBackOff

apiVersion: v1
kind: Pod
metadata:
name: crash-pod
spec:
containers:

- name: busybox
  image: busybox
  command: ["false"]

      >> kubectl get pods

      >> kubectl describe pod <<pod-name>>

  Container exits immediately -- kubelet restarts (loop is going)

  change the command :

  command : ["sleep"]
  args: ["3600"]

> > kubectl replace --force -f pod demo78.yaml

(--force will delete and recreate the pod)

        create/apply  -- used

        apply/replace -- not used

        apply /create -- config for 1st time

        replace -- making modifications




     Scenario 3 ::  If apiVersion or kind is incorrect


        Use this command :

            >> kubectl api-resources

            (it will give you list of objects, shortnames, apiVersions etc)

            then you can change yaml file accordingly ..


      Scenario 4 ::  Service Not working

      >> Deployment is running fine ..

      Service YAML :

          selector:
              app : wronglabel


       Pods have the same label in order for service to work ..

       >> kubectl get pods --show-labels

       >> kubectl get svc
       >> kubectl describe svc <<svc-name>>

       (Mismatch is labels)



       Fix selector ..



      Scenario 5 ::  Deployment not scaling

      >> kubectl scale deployment my-deploy --replicas=7

      Pod remains 4


      Possible cause :

          Deployment Yaml :
              replicas: 4

              kubectl edit deploy my-deploy

              >> Resource limit
       (describe command in deploy)

    >> Declarative overwrites Imperatives ..

         kubectl get deployment my-deploy -o yaml



        Scenario 6 :: Namespace Confusion


        >> You created a deployment but i don't see it

        Possible cause :

            you maybe in different namespace


        Debug :

            kubectl config view

            kubectl config set-context --current --namespace=default

> > Make sure Indentation is correct in YAML files .. ================================================================================================================

         Exercise :

        1.  Create a pod named "web-pod" using nginx image .

        2. Create a deployment "frontend" with 3 replicas using nginx.

        3. Scale deployment "frontend" to 5 replicas

        4. Expose deployment "frontend" as ClusterIP Service.

        5. Create namespace "testing"

        6. Create a pod "test-pod" inside namespace "testing"

        7. Delete pod "web-app"

        8. Generate YAML for deployment without creating it.

        9. Create multi-container pod with nginx + busybox.

10. Mount emptyDir volume in both containers.

11. Update deployment image to nginx:1.25.

12. Rollback deployment.

13. Add label env=dev to existing pod.

14. Create deployment with resource limits.

15. Create service using selector app=frontend.

16. Switch current namespace to testing.

17. Create deployment in testing namespace.

18. Check rollout history of deployment.

==============================================================================================================

Configuration, Security and Services :

            >> How applications communicate
            >> How apps get config details      -- ConfigMaps and Objects
            >> How these apps stay healthy  -- Readiness and Liveness Probes
            >> How resources are controlled (request quota n limits)



        Services and Networking

        Real World Scenario :

            You have an application :

                -- 3 replicas of payment service
                -- 5 replicas of frontend
                -- 2 replicas of order service

             Each Pod has a dynamic IP  (10.10.23.47) -- internal (private ip)
             Pod is deleted , It is a part of replicaset - recreated  (10.10.25.78) -- ip will change

            If one pod dies -- new IP

           How will our frontend service talk to payment ?

           >> You can't assign/hardcore IP of Pods

       -- Services     comes into play


        What are Services ??

        A Service --
                        a kind of object in k8
                        provides a stable IP
                        provides a DNS name
                        load balances traffics to matching pods


      To create  a service -- imperative command or yaml file ...

      ClusterIP, NodePort and LoadBalancer


      ClusterIP  -- Internal service , Accessible via only inside cluster
      (Default)

      Frontend -- calls payment service internally

      Payment Service --- payment-service.default.svc.cluster.local

      Frontend connect using ---   http://payment-service   (No IP address requires)


      Cluster IP -- stable Ip address , pods talk via (name of service), Load balances between pods


      NodePort --  (Port Mapping)

      >> Expose service outside cluster via Node IP + port

          Port Range --  30000-32767


        Example --- You want your frontend to accessbile via browser

          Access --  http://NodeIP:30007 (any port within range)


    NodePort -- not used in Production..
                          used for dev/testing
                        behind the loadbalancer



              Headless Service

              clusterIP : none

              No loadbalancing
              No virtal IP

              Return Pod Ips directly


               Useful in such cases :   -- statefulapps, databases, kafka


        DNS inside Cluster :

            Every services automatically gets a DNS.

            >> service-name.namespace.svc.cluster.local   -- Format

          >>   service-name works inside same namespace


          Debug this :

              >> kubectl run test-pod --image=busybox -it --rm -- sh
               nslookup payment-service



        Service Selectors :

            Service matches pod via labels

            Labels and Selectors

             Example :

                     Pods :
                         app: payment

                     Service :

                         selector:
                             app: payment


          If labels mismatch -- no traffic


          load-balancer :

apiVersion: v1
kind: Service
metadata:
name: myapp-loadbalancer
spec:
selector:
app: myapp
ports: - port: 80
targetPort: 8080
type: LoadBalancer

> > kubectl create -f lb.yaml

> > kubectl get svc --- (External IP -- pending)

Imperative Command :

      >> kubectl expose deploy frontend  --port=80 --target-port=8080 --type=LoadBalncer --name=lb-service


      ConfigMaps :

          You have an app :

              DB_HOST, DB_PORT, LOG_LEVEL etc

              You should not hardcore these values inside the container image

              Instead you should ConfigMaps. (non-sensitive config)


              Create Configmaps :

                  (Creating from literal)

            >>      kubectl create configmap app-config  --from-literal=DB_HOST=mysql --from-literal=LOG_LEVEL=debug

                 (Creating from file)

                 config.env --

                 DB_HOST=mysql
                 LOG_LEVEL=debug

           >>      kubectl create configmap app-config --from-env-file=config.env


      Injecting as Environment Variables :

apiVersion: v1
kind: Pod
metadata:
name: configmap--demo-pod
spec:
containers:

- name: mypod
  image: busybox
  command: ["sh", "-c", "echo $DB_HOST && sleep 3600"]
  env:
  - name: DB_HOST
    valueFrom:
    configMapKeyRef:
    name: app-config
    key: DB_HOST
    > > kubectl create -f <pod-def-filename>
    > > kubectl exec -it configmap--demo-pod -- sh (to go inside pod n container)
    > > use command -- echo $DB_HOST (mysql value is expected)

==============================================================================================================  
 Bash terminal in Ubuntu :

      what is cmd to set up a env variable :

          export DB_HOST=mysql

          echo $DB_HOST

==============================================================================================================

==================================================================================================================  
 AWS Systems Manager -- App config, Env variables (non-sensitive) -- ConfigMaps

      AWS Secrets Manager  -- storing pswds, API keys, tokens (sensitive)  -- Secrets

=================================================================================================================

      Injecting as Volume :

apiVersion: v1
kind: Pod
metadata:
name: configmap--volume-pod
spec:
containers:

- name: mypod
  image: busybox
  command: ["sh", "-c", "sleep 3600"]
  volumeMounts:
  - name: config-volume
    mountPath: /etc/config
    volumes:
- name: config-volume
  configMap:
  name: app-config

> > kubectl apply -f <<name-of-pod>

> > kubectl get pods

> > kubectl describe pod <name-of-pod>

      To get inside container of pod :

    >>   kubectl exec -it configmap--volume-pod -- sh

       cd /etc/config

       ls

(Use these commands to verify)

=============================================================================================================

      Secrets :

          App needs :

              Database password, API toke, Dockerhub Toke, Github access toke, Aws access keys


              Secrets will be used in such cases ...

              >> sensitive vaues (not plain text,  base64 ecoded)

              Base64 encoding  is not equal to encrytption


    -- Mounting secrets as env variables

    -- Mounting secrets as volumes


        Real Production World Example :

            Microservices -- AWS. Database, Payment

            (Credentials stored as secrets)

==========================================================================================================

    Probes -- Readiness and Livness Probes     (Health check)

    (AWS -- ASG and LB -- health check  (how many VMs are healthy and Unhealthy -- sending a msg -- 200 code)

    Scenario :

        Your app is running :

            but it hangs ,  it can't connect to db, it is stuck -- "starting"

            How does k8 system know ?

            Probes


    Livness Probe -- check if the app is alive , It it fails , container is restarted

    Readiness Probe -- check if the app is ready to server the traffic.. If it fails .. pod will be removed


    Use liveness for crash/hang detection
    Use readiness for startup delays


    Liveness Probe --  Should this container be restarted ??
                                    Detects the deadlock and hangs .. Failure --- restart container


           Real Use cases --

                              app enters infinite loop, liveness fails, kubelet restarts container


    Readiness -- Can this container handle requests now ??
                           Detects startup delays, DB down or overload .... Failure -- stop traffic, no restart

    Liveness == survival ...  Readiness == Availability



    -- Resource Management  :


        -- You deploy 10 pods

        One pod  consumes -- 100% CPU , 2 GB memory

        other pods will starve ..

        Cluser become unstable



            Requests vs Limits

    Requests -- Minimum guranteed resources provided

    >> Scheduler uses this to place pod in a particular node ..


    Limits -- Maximum allowed usage.

    If exceeded:
        CPU -- throttled  -- hang
        Memory  -- OOM killed (Out of memory killed)

        kubectl describe pod <name-of-pod>

        Events -- OOM killed


        Scenario :

            Memory leaks in app .

            Limit set to 128 Mi
            App consume 200 Mi

            >> k8 (kubelet)  will kill container

=======================================================================================================

    LAB 6 -- Services and Networking

    Topics -- ClusterIP service, NodePort Service, Test DNS inside cluster, Service Selectors ..


    Step 1 -- Create deployment

    >> kubectl create deployment web  --image=nginx  --replicas=3

    >> kubectl get deploy
    >> kubectl get rs
    >> kubectl get pods -o wide

    Created 3 pods nd each pod has different IP



    Step 2 -- Create ClusterIP service


    yaml file :

apiVersion: v1
kind: Service
metadata:
name: nginx-clusterip
spec:
selector:
app: nginx
ports: - port: 80
targetPort: 80
type: ClusterIP

    >> kubectl create -f <name-of -def. file>


    Imperative command :

    >>  kubectl expose deploy web --port=80 --target-port=80 --name=web-clusterip

    >> kubectl get svc

    >> kubectl describe svc web-clusterip

Step 3 : Test Internal Connectivity :

       >> kubectl run test-pod --image=busybox -it --rm -- sh

    Using this command will take you inside the shell :

        Inside shell :

            nslookup web-clusterip
            wget -qO- http://web-clusterip

            > DNS resolution works
            > Service load balance works

        Exit shell ..


     Step 4 : Create NodePort Service


     Another way (yaml file)

apiVersion: v1
kind: Service
metadata:
name: myapp-service
spec:
type: NodePort
ports: - port: 80
targetPort: 80
nodePort: 30020
selector:
app: myapp
tier: frontend

    (You can also create NodePort service via yaml file (declarative way))



     >> kubectl expose deploy web --port=80 --target-port=80 --type=NodePort --name=web-nodeport

     >> kubectl get svc

     >> kubectl describe svc web-nodeport


     Access in browser via : http://NodeIP:NodePort

     =========================================================================================================



    LAB 7 -- ConfigMap Usage


    Topics --  Create ConfigMap, Use as environment variable, Mount as file, Modify ConfigMap


      Step 1 – Create ConfigMap from Literal

      >> kubectl create configmap app-config \

--from-literal=APP_MODE=production \
 --from-literal=APP_COLOR=blue

      >>  kubectl get configmap
      >>  kubectl describe configmap app-config



        Step 2 – Use ConfigMap as Environment Variable

        Create YAML  (config-env.yaml) :

apiVersion: v1
kind: Pod
metadata:
name: config-env-pod
spec:
containers:

- name: nginx
  image: nginx
  env:
  - name: APP_MODE
    valueFrom:
    configMapKeyRef:
    name: app-config
    key: APP_MODE

  > > kubectl apply -f config-env.yaml

  > > kubectl exec -it config-env-pod -- env | grep APP_MODE

  Step 3 – Mount ConfigMap as Volume

  Create YAML (config-volume.yaml)

apiVersion: v1
kind: Pod
metadata:
name: config-volume-pod
spec:
containers:

- name: nginx
  image: nginx
  volumeMounts:
  - name: config-volume
    mountPath: /etc/config
    volumes:
- name: config-volume
  configMap:
  name: app-config

> > kubectl apply -f config-volume.yaml

> > kubectl exec -it config-volume-pod -- ls /etc/config
> > kubectl exec -it config-volume-pod -- cat /etc/config/APP_MODE

Step 4 – Modify ConfigMap

> > kubectl edit configmap app-config

Change :
APP_MODE=development

> > kubectl exec -it config-volume-pod -- cat /etc/config/APP_MODE

Volume updates automatically (may take few seconds).

BUT env variable does NOT auto-update.

LAB 8 -- Secrets

Topics -- Create Secret, Use as env variable, Mount as volume

Step 1 -- Create Secret

> > kubectl create secret generic db-secret \

       --from-literal=DB_PASSWORD=supersecret

> > kubectl get secret

> > kubectl describe secret db-secret

Step 2 -- Use Secret as Environment Variable

secret-env-pod.yaml

apiVersion: v1
kind: Pod
metadata:
name: secret-env-pod
spec:
containers:

- name: nginx
  image: nginx
  env:
  - name: DB_PASSWORD
    valueFrom:
    secretKeyRef:
    name: db-secret
    key: DB_PASSWORD

> > kubectl create -f secret-env-pod.yaml

> > kubectl get pods

> > kubectl describe pod secret-env-pod

> > kubectl exec -it secret-env-pod -- env | grep DB_PASSWORD

Step 2 -- Mount Secret as Volume

secret-volume-pod.yaml

apiVersion: v1
kind: Pod
metadata:
name: secret-volume-pod
spec:
containers:

- name: nginx
  image: nginx
  volumeMounts:
  - name: secret-volume
    mountPath: /etc/secret
    readOnly: true
    volumes:
- name: secret-volume
  secret:
  secretName: db-secret

> > kubectl create -f secret-volume-pod.yaml

> > kubectl get pods

> > kubectl describe pod secret-volume-pod

> > kubectl exec -it secret-volume-pod -- ls /etc/secret

> > kubectl exec -it secret-volume-pod -- cat /etc/secret/DB_PASSWORD

=================================================================================================================

LAB 9 -- Health Probes (Liveness and Readiness Probes)

Topics -- add liveness, add readiness, simulate failure

Step 1 -- Create a deployment with Probles :

       probe-app.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
name: probe-app
spec:
replicas: 1
selector:
matchLabels:
app: probe
template:
metadata:
labels:
app: probe
spec:
containers: - name: nginx
image: nginx
livenessProbe:
httpGet:
path: /
port: 80
initialDelaySeconds: 5
periodSeconds: 5
readinessProbe:
httpGet:
path: /
port: 80
initialDelaySeconds: 5
periodSeconds: 5

> > kubectl create -f probe-app.yaml

> > kubectl get deploy

> > kubectl describe deploy probe-app

Step 2 : Simulate Failure :

       -- Delete the default index page

    >>   kubectl  exec -it <<pod-name>> -- rm    /usr/share/nginx/html/index.html

> > kubectl describe pod <<pod-name>>

Events -- readiness fails and liveness restarts the container

Readiness -- stops the traffic (success -- then sends are traafic)

point 1 (Home) -- point 2 (Office)

job of those prople -- avoid/make sure road blockage -- removed -- liveness -- path clear

3 ways -- path1 (accident -- traffic/ road blockage) -- readiness (maps) --

path2

path3

Liveness -- restarts container, Readiness -- stop traffic n server again (path clear)

============================================================================================================

LAB 10 -- Resource Limits & OOMKilled

Topics -- Apply resource limits, force memory spike, observer OOMkilled

========================================================================================================
(Auto Scaling -- AWS

launch template -- specs

conditions -- scale out and scale in -- cpu utiliz > 75 % (+1), cpu utiliz < 40 % (-1)

min=2 , max=10

# stress cpu -- live (scaling activity is triggered) )

Step 1 -- Create a pod (memory stress pod)

memory.yaml

apiVersion: v1
kind: Pod
metadata:
name: memory-stress
spec:
containers:

- name: stress
  image: polinux/stress
  resources:
  requests:
  memory: "64Mi"
  limits:
  memory: "128Mi"
  args:
  - "--vm"
  - "1"
  - "--vm-bytes"
  - "200M"
  - "--vm-hang"
  - "1"

> > kubectl create -f memory.yaml

> > kubectl get pods

> > kubectl describe pod memory-stress

memory2.yaml

apiVersion: v1
kind: Pod
metadata:
name: memory-stress
spec:
containers:

- name: stress
  image: ubuntu
  command: ["sleep", "3600"]
  resources:
  requests:
  memory: "64Mi"
  limits:
  memory: "128Mi"

> > oom-pod.yaml

apiVersion: v1
kind: Pod
metadata:
name: memory-hog
spec:
containers:

- name: stress-container
  image: polinux/stress
  resources:
  requests:
  memory: "50Mi"
  limits:
  memory: "100Mi"
  command: ["stress"]
  args: ["--vm", "1", "--vm-bytes", "200M", "--vm-hang", "1"]

> > kubectl create -f memory.yaml

> > kubectl exec -it memory-stress -- bash

Inside shell :

    apt update -y
    apt install stress -y

Reason : OOMkilled

=================================================================================================================================

Troubleshooting Scenarios :

      Scenario 1 :  Service is Not Working

      Endpoints -- none   (Bad selector)   --- Fix Labels n Selectors

      >> kubectl get svc

      (Frontend -- is not able to reach Backend) -- service is not working


      Scenario 2 :  ConigMaps Not Reflecting Changes

      >> kubectl edit cm app-config
          (This will show your current key-value pairs in config)

          kubectl rollout restart deploy app-deploy  (to reflect the changes)

          Config Maps -- Mounted as volumes -- auto-refresh
          Injected as ENV Variables -- need restart


        Scenario 3 : Secrets not working

        POD status -- CrashLoopBackoff

        Reason -- Secret Not Found  ..

    Fix this -- Map that correct secret name is used, values. secret typo



      Scenario 4 :  Liveness Probe Misconfigured

      >> livenessProbe:
          httpGet:

path: /health
port: 8080 (change it to 80)

    (container running port 80)


     >> kubectl get pods -- running ( restart count -- liveness failed)


    AWS -- VM -- Security groups

    Container -- Images -- Expose 5000/8080


     Scenario 5 :  Readiness Probe Blocking Traffic


     >> Pod is running but service is not ruting traffic

      Deployment (Probes)  -- Service  (Endpoints)

      >> NO endpoints

      >> Readiness Probe fails


      --- initialDelaySeconds=30


      Scenario 6 :  OOMKilled

      >> when we are using more than memory limit config  -- (Out of memory will kill/terminate the Pod)

       Increase the limit ...

Scenario 7 : DNS not resolved

> > 3 pods -- ClusterIP -- selectors -- 3 endpoints

4th no. of pod -- iniside terminal ... try to call --- wget http://name-of-cluster-ip-service

(It will onlly work when you are inside same namespace)

DNS -- service-name.namespace.svc.cluster.local

> > nslookup backend

Fails -- Wrong namespace

==================================================================================================================================

Volumes and Storage

> > Why Storage matters

3 tier application (e-commerce)

Frontend --- Stateless

Backend -- Stateless

Database -- needs persistent storage

> > If pod restarts and data disappears -- prod disaster

1.  emptyDir

> > Temporary storage is created when a pod starts
> > Deleted when pod is deleted (ephermal)

Use-cases :

       -- Temporary cache, file processing, sharing data between containers

       Example ---  Log process pattern

                 -- Main app writes logs -- Sidecar read and export the logs

2.  hostPath (CKAD -- basic understanding)

    > > Mounts node filesystem to Pod

    > > Tied to specific node
    > > Not portable

    > > Minikube (single-node cluster)
    > > Dev Environments

3.  PV (PersistentVolume)

> > Cluster-level storage

> > Created by admin

Examples :

       Backed by EBS, NFS, Azure Disk etc

4.  PVC (PersistentVolumeClaim)

> > Pod request storage

> > Pod does not directl talk to PV directly

> > PVC binds to PV

Workflow ( POD --> PVC --- PV )

PV -- PVC (Binding)

5.  StorageClass (Basic Understanding)

> > Automates PV provisioning

When you create PVC -- PV also created

Jobs and CronJobs

> > Backup a database
> > Report generation
> > Email sending batch process

A. JOB

(Runs at once until success)

kind: Job

If containers fails --- retries

Job ensures that task completed successfully ...

B. Parallel Jobs.

> > parallelism : 3

Use cases :

> > Process millions of jobs in parallel

C. CronJobs :

> > Schedule Job

     Examples -- Nighly jobs (2 AM backup)
                          Weekly Cleanup


    schedule :  * * * * *

     5th * -- Day of week (0-7)

     4th * -- Month (1-12)

    3rd * -- Day of Month (1-31)

     2nd * -- Hour (0-23)

     1st * -- Minute (0-59)



    >> run every hour from (9 AM to 5 PM)

        * 9-17 * * * script.sh


    >> run at every 5 minutes

       */5 * * * *  script.sh

=============================================================================================================

       LAB 11 -- emptyDir Volume

       Topics -- Share data between Containers,  understand lifecycle


       App write logs -- sidecar processes logs
       Temporary storage -- no persistance needed

emptydir-pod.yaml

apiVersion: v1
kind: Pod
metadata:
name: emptydir-pod
spec:
containers:

- name: writer
  image: busybox
  command: ["/bin/sh"]
  args:
  - -c
  - |
    while true; do
    echo "Data written at $(date)" >> /shared/data.txt;
    sleep 5;
    done
    volumeMounts:
  - name: shared-volume
    mountPath: /shared

- name: reader
  image: busybox
  command: ["/bin/sh"]
  args:
  - -c
  - |
    while true; do
    cat /shared/data.txt;
    sleep 5;
    done
    volumeMounts:
  - name: shared-volume
    mountPath: /shared

volumes:

- name: shared-volume
  emptyDir: {}

> > kubectl create -f emptydir-pod.yaml

> > kubectl get pods

> > kubectl describe emptydir-pod

> > kubectl logs emptydir-pod -c reader

(Here you will see shared data)

> > kubectl delete pod emptydir-pod

(Pod is deleted, volume is also gone)

LAB 12 -- PV and PVC

Topics -- Understand a PV -- PVC -- Pod relationship, Verify the persistance

Database storage must survive pod restart.

Step 1 -- Create a PV

pv.yaml

apiVersion: v1
kind: PersistentVolume
metadata:
name: pv-demo
spec:
capacity:
storage: 1Gi
accessModes: - ReadWriteOnce
hostPath:
path: /mnt/data

> > kubectl create -f pv.yaml

> > kubectl get pv

> > kubectl describe pv-demo

    (Status is Available)

Step 2 -- Create PVC

pvc.yaml

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
name: pvc-demo
spec:
accessModes: - ReadWriteOnce
resources:
requests:
storage: 500Mi

> > kubectl create -f pvc.yaml

> > kubectl get pvc

> > kubectl describe pvc pvc-demo

(Status should be Bound)

Step 3 : Attach PVC to a Pod

pvc-pod.yaml

apiVersion: v1
kind: Pod
metadata:
name: pvc-pod
spec:
containers:

- name: app
  image: busybox
  command: ["/bin/sh"]
  args: ["-c", "echo Hello PVC > /data/file.txt; sleep 3600"]
  volumeMounts:
  - mountPath: /data
    name: storage
    volumes:
- name: storage
  persistentVolumeClaim:
  claimName: pvc-demo

> > kubectl create -f pvc-pod.yaml

> > kubectl get pods

> > kubectl describe pod pvc-pod

> > kubectl exec pvc-pod -- cat /data/file.txt

    (Output -- Hello VPC)

> > kubectl delete pod pvc-pod

> > kubectl create -f pvc-pod.yaml

> > kubectl get pods

> > kubectl exec pvc-pod -- cat /data/file.txt

    (Output -- Hello VPC)   (File still exists)

(PVC survive the pod restart --- emptyDir will not survive)

===============================================================================================================

       LAB 13 -- Jobs

       Topics -- Create a one-time job, you need to complete it -- retry until completion


       Step 1 -- Craete a Job.yaml

apiVersion: batch/v1
kind: Job
metadata:
name: simple-job
spec:
backoffLimit: 3
template:
spec:
containers: - name: job-container
image: busybox
command: ["sh", "-c", "echo Job running; sleep 5"]
restartPolicy: Never

> > kubectl create -f job.yaml

> > kubectl get jobs

> > kubectl get pods

> > kubectl logs simple-job

    LAB 14 -- CronJob

       Run every minute, evry hour, on specific hrs

       cronjob.yaml

apiVersion: batch/v1
kind: CronJob
metadata:
name: cron-demo
spec:
schedule: "_/1 _ \* \* \*"
jobTemplate:
spec:
template:
spec:
containers: - name: cron-container
image: busybox
command: ["sh", "-c", "date; echo Hello from CronJob"]
restartPolicy: OnFailure

    >> kubectl create -f cronjob.yaml

    >> kubectl logs <pod-name>

    To suspend the cronjob, edit it and make sure suspend value from "false" to "true"

==============================================================================================================

       Service Accounts + RBAC

> > Application needs to read pods, configmaps -- (specific access)

(similar to IAM roles , ec2 -- s3 access)

(GCP cloud -- service accounts)

1. Service account

2. Role -- define permissions

3. RoleBinding ( Binds Role to Service Account)

Pod -- ServiceAccount -- Role -- RolebInding

    LAB 15  -- ServiceAccount + RBAC

     Objective -- Create restricted access to pod

     Step 1 -- Create ServiceAccount  , Role, RoleBinding

serviceaccount.yaml

apiVersion: v1
kind: ServiceAccount
metadata:
name: app-sa

role.yaml

apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
name: pod-reader
rules:

- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]

role-binding.yaml

apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
name: pod-reader-binding
subjects:

- kind: ServiceAccount
  name: app-sa
  roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
  > > Create these three k8 objects
  > > Step 2 : Create a Pod using ServiceAccount
  > > rbac-pod.yaml

apiVersion: v1
kind: Pod
metadata:
name: rbac-test
spec:
serviceAccountName: app-sa
containers:

- name: test
  image: bitnami/kubectl
  command: ["sleep", "3600"]

> > kubectl create -f rbac-pod.yaml

> > kubectl get pods

Step 3 : Test Access

> > kubectl exec -it rbac-test -- kubectl get pods

Pod has access to list all pods in cluster

If you try this command

> > > > kubectl exec -it rbac-test -- kubectl delete pod <<pod-name>>

(it will fail, because of limited permissions in service account)

=============================================================================================================

Tasks

1. Create multi-container pod with shared emptyDir.

2. Add readiness probe to nginx deployment.

3. Create deployment with:

   3 replicas
   CPU request
   Memory limit

4. Expose deployment as ClusterIP service.

5. Create secret and mount inside pod.

6. Fix broken YAML

7. Scale deployment to 5 replicas.

8. Create CronJob running every 2 minutes.

9. Create PVC and attach to pod.

10. Create ServiceAccount with limited pod read access.

=============================================================================================================

========================================================================================================================

//https://github.com/ajit010/CKAD-repo----23-27-?tab=readme-ov-file
