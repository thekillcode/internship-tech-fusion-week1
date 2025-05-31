# import os
from pathlib import Path
from datetime import datetime


log_path = Path("/logs")
log_path.mkdir(exist_ok=True)


def write_log(key: str, message: str):
    file_path = log_path / f"{key}_log.txt"
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(file_path, mode="a") as log:
        log.write(f"[{timestamp}] {message}\n")
