import os
import sys
from pathlib import Path

import dotenv
from django.core.wsgi import get_wsgi_application

dotenv.load_dotenv(
    dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
)

# This allows easy placement of apps within the interior
# marketplace directory.
app_path = Path(__file__).resolve().parent.parent.joinpath("marketplace")
sys.path.append(str(app_path))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

application = get_wsgi_application()
