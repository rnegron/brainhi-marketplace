# from https://github.com/TheIndexingProject/contratospr-api/blob/master/runtests.py

import subprocess
import sys

import pytest

BLACK_ARGS = ["--check", "."]

FLAKE8_ARGS = []

ISORT_ARGS = ["--recursive", "--check-only", "--diff"]

PYTEST_ARGS = {"default": [], "fast": ["-q"]}


def exit_on_failure(ret, message=None):
    if ret:
        sys.exit(ret)


def flake8_main(args):
    print("Running flake8 code linting")
    ret = subprocess.call(["flake8"] + args)
    print("flake8 failed" if ret else "flake8 passed")
    return ret


def isort_main(args):
    print("Running isort import formatting")
    ret = subprocess.call(["isort"] + args)
    print("isort failed" if ret else "isort passed")
    return ret


def black_main(args):
    print("Running black code formatting")
    ret = subprocess.call(["black"] + args)
    print("black failed" if ret else "black passed")
    return ret


def split_class_and_function(string):
    class_string, function_string = string.split(".", 1)
    return f"{class_string} and {function_string}"


def is_function(string):
    # `True` if it looks like a test function is included in the string.
    return string.startswith("test_") or ".test_" in string


def is_class(string):
    # `True` if first character is uppercase - assume it's a class name.
    return string[0] == string[0].upper()


if __name__ == "__main__":
    try:
        sys.argv.remove("--nolint")
    except ValueError:
        run_flake8 = True
        run_isort = True
        run_black = True
    else:
        run_flake8 = False
        run_isort = False
        run_black = False

    try:
        sys.argv.remove("--lintonly")
    except ValueError:
        run_tests = True
    else:
        run_tests = False

    try:
        sys.argv.remove("--fast")
    except ValueError:
        style = "default"
    else:
        style = "fast"
        run_flake8 = False
        run_isort = False
        run_black = False

    if len(sys.argv) > 1:
        pytest_args = sys.argv[1:]
        first_arg = pytest_args[0]

        if first_arg.startswith("-"):
            # `runtests.py [flags]`
            pytest_args = ["tests"] + pytest_args
        elif is_class(first_arg) and is_function(first_arg):
            # `runtests.py TestCase.test_function [flags]`
            expression = split_class_and_function(first_arg)
            pytest_args = ["tests", "-k", expression] + pytest_args[1:]
        elif is_class(first_arg) or is_function(first_arg):
            # `runtests.py TestCase [flags]`
            # `runtests.py test_function [flags]`
            pytest_args = ["tests", "-k", pytest_args[0]] + pytest_args[1:]
    else:
        pytest_args = PYTEST_ARGS[style]

    if run_tests:
        exit_on_failure(pytest.main(pytest_args))

    if run_black:
        exit_on_failure(black_main(BLACK_ARGS))

    if run_flake8:
        exit_on_failure(flake8_main(FLAKE8_ARGS))

    if run_isort:
        exit_on_failure(isort_main(ISORT_ARGS))
