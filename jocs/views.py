from django.shortcuts import render,get_object_or_404,redirect, render_to_response
from jocs.models import Joc
from .forms import JocForm
from django.forms import modelform_factory
from django.contrib import messages
# Create your views here.



def index(request):
    jocs= Joc.objects.all();
    ctx={'llista_jocs': jocs}
    return render(request, "jocs/index.html",ctx)
"""
def consoles(request):
    articles= Article.objects.filter(esconsola=True);
    ctx={'llista_articles': articles}
    return render(request, "articles/productes.html",ctx)
    
def accesoris(request):
    articles= Article.objects.filter(esaccesori=True);
    ctx={'llista_articles': articles}
    return render(request, "articles/productes.html",ctx)
    
def videojocs(request):
    articles= Article.objects.filter(esaccesori=False,esconsola=False);
    ctx={'llista_articles': articles}
    return render(request, "articles/productes.html",ctx)
"""    
def joc(request,id_joc):
    joc = get_object_or_404(Joc,pk=id_joc)
    ctx={'joc': joc}
    return render(request,"jocs/joc.html",ctx)
    

"""
def crear_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST,request.FILES)
        
        if form.is_valid():
           nom= form.cleaned_data['nom']
           consola = form.cleaned_data['consola']
           esconsola = form.cleaned_data['esconsola']
           PEGI=form.cleaned_data['PEGI']
           stock=form.cleaned_data['stock']
           companyia=form.cleaned_data['companyia']
           preu=form.cleaned_data['preu']
           coleccionista=form.cleaned_data['coleccionista']
           detalls=form.cleaned_data['detalls']
           imatge=form.cleaned_data['imatge']
           video=form.cleaned_data['video']
           esaccesori = form.cleaned_data['esaccesori']
           #creem l'objecte OFERTA_DISC amb les dades rebudes
           Article.objects.create( nom=nom,
                                        consola=consola,
                                        esconsola=esconsola,
                                        PEGI=PEGI,
                                        stock=stock,
                                        companyia=companyia,
                                        preu=preu,
                                        coleccionista=coleccionista,
                                        detalls=detalls,
                                        imatge=imatge,
                                        video=video,
                                        esaccesori=esaccesori,)   
           messages.info(request,"joc pujat correctament")
           return redirect("usuaris:menu_usuari")    
    else:
        form= ArticleForm()
        
    for f in form.fields:
        form.fields[f].widget.attrs['class'] = 'formulari'
        
    return render (request, 'articles/crear_article.html', {'form': form} )   """
    
    
   
def editar_joc(request, id_joc):
    EditForm = modelform_factory(Joc, fields=('nom','preuE','preuG','imatge','descripcio'))
    unEdit = Joc()
    
    #comprovem que existeix l'oferta_disc
    if id_joc:
        unEdit = get_object_or_404(Joc, pk=id_joc)
        
    if request.method == 'POST':
        form = EditForm (request.POST,request.FILES, instance= unEdit)
        if form.is_valid():
           form.save()
           messages.info(request,"Joc canviat correctament")
           return redirect("usuaris:menu_usuari")    
    else:
        form= EditForm (instance = unEdit)
    
    for f in form.fields:
        form.fields[f].widget.attrs['class'] = 'formulari'
 
    form.fields['nom'].widget.attrs['placeholder']="Nom"
    form.fields['descripcio'].widget.attrs['placeholder']="Descripcio"
    form.fields['preuE'].widget.attrs['placeholder']="PreuE"
    form.fields['preuG'].widget.attrs['placeholder']="PreuG"
    
    return render (request, 'jocs/editar_joc.html', {'form': form} )    
    
   
def eliminar_joc(request,id_joc=None):
    
    if request.method == 'POST':
        joc = get_object_or_404(Joc, pk=id_joc);
        if (id_joc):
            joc.delete()
            return redirect('usuaris:menu_usuari')
    else:
        return render(request, 'jocs/eliminar_joc.html', {'Joc': Joc.objects.get(pk=id_jocs)})
                  
from django.db.models import Q             
      
                               
def search(request):
    query = request.GET.get('q', '')
    if query:
        qset = (
            Q(nom__icontains=query)
        )
        results = Joc.objects.filter(qset).distinct()
    else:
        results = []
    return render( request, "jocs/productes.html", 
                                { "llista_jocs": results,
                                   "query": query }
                               )
                              
                               
from django.core.urlresolvers import reverse
from django.http import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.management import call_command
import datetime
import sys

@login_required
def fer_backups(request):
    if (request.user.usuari.admin):
        sysout = sys.stdout
        nomFitxer = "backups/media/bdd-Backup" + str(datetime.datetime.now()).replace(" ","").replace(":","-")+".xml"
        sys.stdout = open (nomFitxer, 'w')
        call_command('dumpdata',indent=2,format='xml')
        sys.stdout = sysout
        return HttpResponseRedirect(reverse('jocs:index'))
    else:
        return HttpResponseRedirect(reverse('jocs:productes'))
