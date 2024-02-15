# bracket_challenge.py

NUM_MATCHUPS = 8  # Assuming 8 first-round matchups

def get_user_submission():
    user_name = input("Enter your name: ")
    submission = []
    for i in range(NUM_MATCHUPS):
        winner = input(f"Enter the winner for Matchup {i + 1} (Team A or Team B): ")
        submission.append(winner)
    return user_name, submission

def main():
    submissions = {}  # Store submissions (user name -> bracket submission)

    print("Welcome to the Bracket Challenge!")
    user_name, user_submission = get_user_submission()

    # Store the submission (you'd replace this with database logic)
    submissions[user_name] = user_submission

    print(f"Thank you for your submission, {user_name}!")
    print("Your bracket:")
    for i, winner in enumerate(user_submission):
        print(f"Matchup {i + 1}: Winner - {winner}")

    # Scoring logic (compare with correct bracket)
    # ... (implement scoring based on your predefined correct bracket)

if __name__ == "__main__":
    main()
