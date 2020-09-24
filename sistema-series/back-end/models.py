from config import *

class Serie (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    genero = db.Column(db.String(254))
    numtemps = db.Column(db.String(254))
    nota = db.Column(db.String(254))    

    def __str__(self):
        return f'''
                - id: ({self.id}) 
                - nome: {self.nome} 
                - genero: {self.genero} 
                - numtemps: {self.numtemps}
                - nota: {self.nota}
                '''
    
    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "genero": self.genero,
            "numtemps": self.numtemps,
            "nota": self.nota,
        })

if __name__ == "__main__":

    if os.path.exists(db_file):
        os.remove(db_file)

    db.create_all()

    serie1 = Serie(nome="Teen Wolf", genero="Ficção Cientifica", 
        numtemps="6", nota="0")

    db.session.add(serie1)
    db.session.commit()