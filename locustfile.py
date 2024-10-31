from locust import HttpUser, task, between

class UserTasks(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_users(self):
        self.client.get("/users")

    @task
    def get_user_by_id(self):
        user_id = 1
        self.client.get(f"/users/{user_id}")

    @task
    def create_post(self):
        self.client.post("/posts", json={
            "title": "foo",
            "body": "bar",
            "userId": 1
        })

    @task
    def update_post(self):
        post_id = 1
        self.client.put(f"/posts/{post_id}", json={
            "title": "updated title",
            "body": "updated body",
            "userId": 1
        })

    @task
    def delete_post(self):
        post_id = 1
        self.client.delete(f"/posts/{post_id}")
