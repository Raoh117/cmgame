from django.shortcuts import render,get_object_or_404,redirect, render_to_response
from jocs.models import Joc
from .forms import JocForm
from django.forms import modelform_factory
from django.contrib import messages
from django.conf import settings
# Create your views here.



def index(request):
    jocs= Joc.objects.all();
    ctx={'llista_jocs': jocs}
    return render(request, "jocs/index.html",ctx)

def joc(request,id_joc):
    joc = get_object_or_404(Joc,pk=id_joc)
    ctx={'joc': joc}
    return render(request,"jocs/joc.html",ctx)
    
        
def crear_joc(request):
    if request.method == 'POST':
        form = JocForm(request.POST,request.FILES)
        
        if form.is_valid():
           nom= form.cleaned_data['nom']
           preuE=form.cleaned_data['preuE']
           preuG=form.cleaned_data['preuG']
           descripcio=form.cleaned_data['descripcio']
           imatge=form.cleaned_data['imatge']
           #creem l'objecte Joc amb les dades rebudes
           Joc.objects.create( nom=nom,
                                        preuE=preuE,
                                        preuG=preuG,
                                        descripcio=descripcio,
                                        imatge=imatge,)   
           messages.info(request,"joc pujat correctament")
           return redirect("usuaris:menu_usuari")    
    else:
        nova_id=Joc.objects.latest('id'); #Haig de sumar un, o baixar el contador general
        nova_id.id += 1
        form= JocForm()
        
    for f in form.fields:
        form.fields[f].widget.attrs['class'] = 'formulari'
        
    return render (request, 'jocs/crear_joc.html', {'form': form, "nova_id":nova_id} )   
    
    
   
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
