FROM ubuntu

LABEL author="Nelson Castro"
LABEL mail="00043516@uca.edu.sv"

RUN apt update -y
RUN apt install -y git