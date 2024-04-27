import secrets

# Generate a random 256-bit (32 bytes) secret key
secret_key = secrets.token_hex(32)
print("Generated secret key:", secret_key)
