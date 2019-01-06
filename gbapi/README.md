# Gramin bharat API

This is repository contains gramin bharat api 

## Technology Stack 
* Google AppEngine 
* Python Django 
* JWT Authentication 
* Graphql

# Development Setup
* My machine virtaul env `source /Users/vinaymavi/envs/graminbharat/bin/activate`
* Google cloud sql proxy `cloud_sql_proxy -instances=api-dev-graminbharat:asia-south1:api-dev-graminbharat=tcp:3306`
* run `python3 manage.py runserver`

# Migration 
* create migration `python3 manage.py makemigrations`
* apply migration `python3 manage.py migrate`