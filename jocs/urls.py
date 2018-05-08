from django.conf.urls import url
from articles import views

app_name='articles'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search/$', views.search, name="search"),
    url(r'^joc/(?P<id_joc>\d+)$', views.joc, name="joc"),
    url(r'(?P<id_joc>\d+)/eliminar_joc/$', views.eliminar_joc, name="eliminar_joc"),
    url(r'(?P<id_joc>\d+)/editar_joc/$', views.editar_joc, name="editar_joc"),
    url(r'^fer_backups/$', views.fer_backups, name='fer_backups'),
]