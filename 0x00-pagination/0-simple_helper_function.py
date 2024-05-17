#! /usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Returns a tuple of size two containing a start index and an end index
    corresponding to the range of indexes to return in a list for those
    particular pagination parameters.

    Args:
        page (int): The page number.
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: A tuple of size two containing a start index and an
        end index.
    """
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)
