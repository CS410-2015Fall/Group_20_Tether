from django.conf.urls import patterns, url, include
from .views import UserList

user_urls = patterns('',
    url(r'^$', UserList.as_view(), name='user-list'),
)

urlpatterns = patterns('',
    url(r'^users', include(user_urls)),
)