from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    # Add the error details below an "errors" key
    if response is not None:
        error_data = response.data

        response.data = {"errors": error_data}

    return response
