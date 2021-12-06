import time
from locust import HttpUser, task, between

class TodoUser(HttpUser):

    waitTime = between(1, 5)

    @task
    def index(self):
        self.client.get(url="/")

    @task
    def getAllItems(self):
        self.client.get(url="/todo")
