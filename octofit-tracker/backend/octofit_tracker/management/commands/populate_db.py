from django.core.management.base import BaseCommand
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create teams
        marvel_id = db.teams.insert_one({'name': 'Marvel'}).inserted_id
        dc_id = db.teams.insert_one({'name': 'DC'}).inserted_id

        # Create users
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team_id': marvel_id},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team_id': marvel_id},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team_id': dc_id},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team_id': dc_id},
        ]
        user_ids = db.users.insert_many(users).inserted_ids

        # Create activities
        activities = [
            {'user_id': user_ids[0], 'type': 'Running', 'duration': 30},
            {'user_id': user_ids[1], 'type': 'Cycling', 'duration': 45},
            {'user_id': user_ids[2], 'type': 'Swimming', 'duration': 60},
            {'user_id': user_ids[3], 'type': 'Yoga', 'duration': 20},
        ]
        db.activities.insert_many(activities)

        # Create leaderboard
        leaderboard = [
            {'team_id': marvel_id, 'points': 100},
            {'team_id': dc_id, 'points': 90},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Create workouts
        workouts = [
            {'name': 'Cardio Blast', 'description': 'High intensity cardio workout'},
            {'name': 'Strength Training', 'description': 'Full body strength exercises'},
        ]
        db.workouts.insert_many(workouts)

        # Ensure unique index on email for users
        db.users.create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('Database populated with test data using PyMongo.'))
