from django import forms


class JocForm (forms.Form):
    imatge = forms.ImageField(label='Selecciona un archiu')
    nom = forms.CharField(max_length=120, label = 'nom')
    preu=forms.IntegerField(label="preu")
    descripcio= forms.CharField(label="descripcio",widget=forms.Textarea)

    
    
