# FastAPI - FastAPI | Postgre | React

![Static Badge](https://img.shields.io/badge/Docker_Pulls-Docker_Hub-blue)
![Static Badge](https://img.shields.io/badge/Source_CODE-GitHub-blue)

## Features

- JWT Token Authentication (Access)
- Forgot Password | Reset Passwod
- Pre-configured user roles (Admin, User)
- CORS configured for React development
- PostgreSQL database integration
- Automatic schema migrations

# Quick Start

## 1. Backend

### Step 1 - Create activate env

```bash
python -m venv venv
source venv/scripts/activate
```

### Step 2 - Install Required Packages

```bash
pip install -r requirements.txt
```

### <strong style="color:red">Note: </strong>

Postgress Already integrated with mysqlalchemy . if you want to use any other database change change the mysqlalchemy . i have already tested with MySQL and sqlite.if its not sqlite make sure to create database manually

### Step 3 - Install python packages and run the server

```bash
pip install -r requirements.txt
python main.py
```

## 2. Frontend

### Step 1 - change dir to ui folder and install node packages

```bash
cd ui
npm i
```

### Step 2 - Run the dev server

```bash
npm run dev
```
