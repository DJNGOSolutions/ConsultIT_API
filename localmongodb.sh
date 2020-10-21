#!/bin/sh

docker run -d -p 27017:27017 -v ~/datamongo:/data/db --name consultit-mongo mongo