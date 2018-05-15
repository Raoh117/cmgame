from django import forms


class JocForm (forms.Form):
    imatge = forms.ImageField(label='Selecciona un archiu')
    nom = forms.CharField(max_length=120, label = 'nom')
    preuE=forms.IntegerField(label="preuE")
    preuG=forms.IntegerField(label="preuG")
    descripcio= forms.CharField(label="descripcio",widget=forms.Textarea)

    
    
