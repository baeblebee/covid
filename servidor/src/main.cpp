#include <napi.h>
#include <iostream>
#include <stdlib.h>
#include <stdio.h>
#include "math.h"
#include <string.h>
#include <unistd.h>

using namespace std;

#define NNOMES 19567

int igual(const char a[200], char b[200]){ //verifica se duas strings sao iguais //1 igual 0 diferente
    for(int i=0;;i++){
        if(i>1 and a[i]=='\0' and b[i]=='\0'){
            return 1;
        }
        if(a[i]!=b[i]){
            return 0;
        }
    }
}

int igual(char a[200], char b[200]){ //verifica se duas strings sao iguais //1 igual 0 diferente
    for(int i=0;;i++){
        if(i>1 and a[i]=='\0' and b[i]=='\0'){
            return 1;
        }
        if(a[i]!=b[i]){
            return 0;
        }
    }

}



class no{
public:

    char nome[200];
    char nome2[200];
    no * prox;
    int nivel;
    float score;

    no(char a[200]){
        for(int i=0;i<200;i++){
            nome[i]=a[i];
        }
        prox=NULL;
        score=0;
    }

};


class dados{
public:

    no * raiz;

    int qt;

    dados(){
        raiz=NULL;
        qt=0;
    }

    void imprime(){
        no * aux = raiz;
        while(aux!=NULL){
            cout<<aux->nome<<" ";
            aux=aux->prox;
        }
        cout<<endl;
        cout<<endl;
    }



    void imprime_s(){
        no * aux = raiz;
        while(aux!=NULL){
            cout<<aux->score<<" n:"<<aux->nome<<endl;
            aux=aux->prox;
        }
        cout<<endl;
        cout<<endl;
    }



    int adiciona(no * n){//adiciona no começo sem analisar nada
        no * aux = raiz;
        if(aux==NULL){
            raiz=n;
            qt++;
            return 1;
        }
        else{
            n->prox=raiz;
            raiz=n;
            qt++;
        }
        return 0;
    }


    int adiciona_valida(no * n){//adiciona no final, nao adiciona nos com nomes repetidos
        no * aux = raiz;
        if(aux==NULL){
            raiz=n;
            qt++;
            return 1;
        }
        while(aux!=NULL){
            if(igual(n->nome,aux->nome)==0){
                if(aux->prox==NULL){
                    aux->prox=n;
                    qt++;
                    return 1;
                }
                aux=aux->prox;
            }
            else {
                return 0;
            }
        }
        return 0;
    }



    int adiciona_valida_atualiza(no * n){ //igual o segundo adiciona mas caso o nome ja esteja na estrutura de ddos ele aumenta o score
        no * aux = raiz;
        if(aux==NULL){
            raiz=n;
            qt++;
            return 1;
        }
        while(aux!=NULL){
            if(igual(n->nome,aux->nome)==0){
                if(aux->prox==NULL){
                    aux->prox=n;
                    qt++;
                    return 1;
                }
                aux=aux->prox;
            }
            else {
                aux->score+=n->score;

                return 0;
            }
        }
        return 0;
    }



};




void divide(const char a[], dados * d){ //recebe uma cadeia de genes e divide ela em varios genes gene1/nege2 -> gene1 gene2
    char gene[200];
    for(int i=0,j=0;;i++,j++){
        if(a[i]=='/' or a[i]=='\0'){
            j=-1;
            no* n=new no(gene);
            n->nivel=0;
            d->adiciona_valida(n);
        }
        else{
            gene[j]=a[i];
            gene[j+1]='\0';
        }

        if(a[i]=='\0')break;
    }
}


int resposta(no * n, dados * m, dados * resp, int nei, int fus, int coo, int coe, int exp, int dat, int tex, float limiar, int nivel, float pont, int tnivel, char nome[2][NNOMES][50], dados * pas){

    int coments=0;//verifica se um gene depois possui medicamento, muda forma de print

    if(nivel<tnivel){

        char link[200];

        getcwd(link,100);

        strcat(link, "/gens/");
        strcat(link, n->nome);
        strcat(link, "-gens.txt");


        FILE *fh;

        if((fh = fopen(link, "r")) == NULL) {
            printf("Arquivo nao encontrado!\n");
        }


        while (!feof(fh)){//percorre todos os genes conectados ao gene corrente
            char a;
            char cod1[200];
            char cod2[200];
            int aux=0;
            for(int i=0;;i++){
                fscanf(fh, "%c", &a);
                if(a==' '){
                    aux++;
                    i=-1;
                }
                if(aux==0){
                    cod1[i]=a;
                    cod1[i+1]='\0';
                }
                if(aux==2){
                    cod2[i]=a;
                    cod2[i+1]='\0';
                }
                if(aux==1)aux=2;
                if(aux==3)break;
            }
            int a1,a2,a3,a4,a5,a6,a7,a8;
            fscanf(fh, "%d %d %d %d %d %d %d %d ", &a1, &a2, &a3, &a4, &a5, &a6, &a7, &a8);
            float p=0.041;
            float s_1, s_2, s_3, s_4, s_5, s_6, s_7;
            float s_1_nop, s_2_nop, s_3_nop, s_4_nop, s_5_nop, s_6_nop, s_7_nop;
            float s_tot_1=1.0;
            if(nei==1 and a1>0){//le ponttuação
                s_1=a1;
                s_1=s_1/1000.0;
                s_1_nop = (s_1 - p) / (1.0 - p);
                s_tot_1 = s_tot_1 * (1.0 - s_1_nop);
            }
            if(fus==1 and a2>0){
                s_2=a2;
                s_2=s_2/1000.0;
                s_2_nop = (s_2 - p) / (1.0 - p);
                s_tot_1 = s_tot_1 * (1.0 - s_2_nop);
            }
            if(coo==1 and a3>0){
                s_3=a3;
                s_3=s_3/1000.0;
                s_3_nop = (s_3 - p) / (1.0 - p);
                s_tot_1 = s_tot_1 * (1.0 - s_3_nop);
            }
            if(coe==1 and a4>0){
                s_4=a4;
                s_4=s_4/1000.0;
                s_4_nop = (s_4 - p) / (1.0 - p);
                s_tot_1 = s_tot_1 * (1.0 - s_4_nop);
            }
            if(exp==1 and a5>0){
                s_5=a5;
                s_5=s_5/1000.0;
                s_5_nop = (s_5 - p) / (1.0 - p);
                s_tot_1 = s_tot_1 * (1.0 - s_5_nop);
            }
            if(dat==1 and a6>0){
                s_6=a6;
                s_6=s_6/1000.0;
                s_6_nop = (s_6 - p) / (1.0 - p);
                s_tot_1 = s_tot_1 * (1.0 - s_6_nop);
            }
            if(tex==1 and a7>0){
                s_7=a7;
                s_7=s_7/1000.0;
                s_7_nop = (s_7 - p) / (1.0 - p);
                s_tot_1 = s_tot_1 * (1.0 - s_7_nop);
            }

            float s_tot_2 = 1.0 - s_tot_1;
            float media = s_tot_2 + p * (1.0 - s_tot_2);

            media=pont*media;

            if(media>limiar){

                no * n3 = new no(cod2);

                int valid=0;

                if(valid==0){
                    n3->score=media;
                    coments+=resposta(n3, m, resp, nei, fus, coo, coe, exp, dat, tex, limiar, nivel+1, media, tnivel, nome, pas);//se for encontrado um gene com pontuação e nivel adequadoe  lançado na funça recursiva
                }
            }
        }

        fclose(fh);
    }

    no * n2 = m->raiz; //vai percorrer todas os genes com drogas

    while(n2!=NULL){
        if(igual(n->nome, n2->nome)==1){//se tem droga
            for(int i=0;i<NNOMES;i++){
                if(igual(n->nome,nome[1][i])==1){//quak a traddução

                    for(int i=0;i<nivel;i++)
                        cout<<"     ";


                    cout<<nome[0][i]<<" Scorec: "<<pont<<" Level: "<<nivel;//print em genes com droga
                    if(nivel==0)printf("\033[34m Gene with drug \033[0m");
                    if(nivel==1)printf("\033[31m Gene with drug \033[0m");
                    if(nivel==2)printf("\033[32m Gene with drug \033[0m");
                    if(nivel>2)printf("\033[33m Gene with drug \033[0m");
                    cout<<endl;

                    n2 = m->raiz; //vai percorrer todas os genes com drogas

                    while(n2!=NULL){
                        if(igual(n->nome, n2->nome)==1){//se tem droga
                            no * n3 = new no(n2->nome2);
                            if(nivel>0){
                                float nivel_a=nivel;
                                nivel_a=pow(pont/nivel_a,2);
                                n3->score=nivel_a;
                            }
                            else{
                                n3->score=1.0;
                            }
                            resp->adiciona_valida_atualiza(n3);
                        }
                        n2=n2->prox;
                    }
                    return 1;
                }
            }
        }
        n2=n2->prox;
    }


    if(coments>0){
            for(int i=0;i<NNOMES;i++){//tradução
                if(igual(n->nome,nome[1][i])==1){

                    for(int i=0;i<nivel;i++)
                        cout<<"     ";//print distancia em nivel

                    cout<<nome[0][i]<<" Score: "<<pont<<" Level: "<<nivel<<endl;//print em genes intermediarios
                    break;
                }
            }
            return 1;
    }

    return 0;

}


int adiciona(dados * d, dados * m, dados * resp, int nei, int fus, int coo, int coe, int exp, int dat, int tex, float limiar, int nivel, char nome[2][NNOMES][50]){ //evento recurivo para gerar a gcn

    no * n = d->raiz;

    while(n!=NULL){

        dados * pas = new dados();

        resposta(n, m, resp, nei, fus, coo, coe, exp, dat, tex, limiar, 0, 1.0, nivel, nome, pas);//chama a função processo com os genes que foram usados na entrada

        n=n->prox;

    }

    return 1;
}


void traduz(dados * d1, dados * d2, char nome[2][NNOMES][50]){ //recebe nome de gene e retorna seu codigo
    no * n = d1->raiz;
    while(n!=NULL){
        for(int i=0;i<NNOMES;i++){
            if(igual(n->nome, nome[0][i])==1){
                no * aux = new no(nome[1][i]);
                aux->nivel=n->nivel;
                aux->score=n->score;
                for(int j=0;j<100;j++)
                    aux->nome2[j]=n->nome2[j];
                d2->adiciona_valida(aux);

            }
        }
        n=n->prox;
    }

}




void help(){

cout<<endl;
cout<<"Execute: ./RGD + <parameters>"<<endl;

cout<<endl;
cout<<"  -----------------------------------------------------------------------------  "<<endl;

cout<<"-Gene list that will be used in drug search:"<<endl;
cout<<"-f gene1/gene2 "<<endl;
cout<<endl;
cout<<"Example: ./RGD -f ATXN1/ATXN3/ATXN7"<<endl;
cout<<"The example will perform the search using the ATXN1, ATN3, and ATXN7 genes."<<endl;

cout<<endl;
cout<<"  -----------------------------------------------------------------------------  "<<endl;

cout<<"--Parameters that evaluate the connection between genes (more info: string-db.org)"<<endl;
cout<<"Neighborhood: -nei 1 "<<endl;
cout<<"Fusion: -fus 1 "<<endl;
cout<<"Cooccurence: -coo 1 "<<endl;
cout<<"Coexpression: -coe 1 "<<endl;
cout<<"Experimental: -exp 1 "<<endl;
cout<<"Database: -dat 1 "<<endl;
cout<<"Textmining: -tex 1 "<<endl;
cout<<endl;
cout<<"Example: ./RGD -f ATXN3 -fus 1 -coo 1 -dat 0"<<endl;
cout<<"The example will perform the search using the Fusion and Coexpression parameters."<<endl;
cout<<endl;
cout<<"Standard: -nei 0 -fus 0 -coo 0 -coe 1 -exp 0 -dat 0 -tex 0"<<endl;
cout<<endl;

cout<<"  -----------------------------------------------------------------------------  "<<endl;
cout<<endl;

cout<<"-Modify the distance from one gene to one of the input genes in the network. Distance equal to x will consider neighbors with a distance x to the target."<<endl;
cout<<"-ni <level> "<<endl;
cout<<endl;
cout<<"Example: ./RGD -f ATXN3 -ni 2"<<endl;
cout<<"The example will perform the search using up to 2 neighbors of the ATXN3 gene"<<endl;
cout<<endl;
cout<<"Standard: -ni 3 "<<endl;
cout<<endl;

cout<<"  -----------------------------------------------------------------------------  "<<endl;
cout<<endl;

cout<<"-Minimum score a relationship must have to be considered on the network"<<endl;
cout<<"-li <limiar> com 0 <= limiar <= 1 "<<endl;
cout<<endl;
cout<<"-li <threshold> with 0 <= threshold <= 1"<<endl;
cout<<"The example will perform the search using neighbors relationship score greater than 0.2"<<endl;
cout<<endl;
cout<<"Standard: -li 0.3 "<<endl;
cout<<endl;

}



int main( int argc, const char* argv[])
{

    cout<<"Lendo dados "<<endl;

    cout<<"   "<<"Lendo codigos "<<endl;

    char nome[2][NNOMES][50];

    FILE *fh;

    if((fh = fopen("infos.txt", "r")) == NULL) {
        printf("Arquivo nao encontrado!\n");
    }

    int linha=-1;
    while (!feof(fh)){
   //for(int lala=0;lala<10;lala++){
        linha++;
        char a;
        char cod1[200];
        char cod2[200];
        char resto[10000];
        int aux=0;
        for(int i=0;;i++){
            fscanf(fh, "%c", &a);
            if(a=='\t'){
                aux++;
                i=-1;
            }
            if(aux==0){
                cod1[i]=a;
                cod1[i+1]='\0';
            }
            if(aux==2){
                cod2[i]=a;
                cod2[i+1]='\0';
            }
            if(aux==1)aux=2;
            if(a=='\n'){
                break;
            }
        }
        for(int i=0;i<200;i++){
            nome[0][linha][i]=cod2[i];
            nome[1][linha][i]=cod1[i];
        }
   }


    cout<<"   "<<"Lendo medicamentos "<<endl;



    if((fh = fopen("medicamentos.txt", "r")) == NULL) {
        printf("Arquivo nao encontrado!\n");
    }

    dados * m2 = new dados();

    int cont2=0;

    while (!feof(fh)){
        char a;
        char cod1[200];
        char cod2[200];
        int cont=0;
        int j=0;
        for(int i=0;;i++,j++){

            fscanf(fh, "%c", &a);

            if(a=='\n'){
                break;
            }

            if(a==' ' and cont==0){
                cont++;
                j=0;
                fscanf(fh, "%c", &a);
            }


            if(cont==0){
                cod1[j]=a;
                cod1[j+1]='\0';
            }

            if(cont==1){
                cod2[j]=a;
                cod2[j+1]='\0';
            }

        }

        cont2++;

        no * aux = new no(cod1);

        for(int j=0;j<100;j++)
            aux->nome2[j]=cod2[j];

        m2->adiciona(aux);
   }


    cout<<"Processando dados "<<endl;

    //le entrada


    int nei=0;
    int fus=0;
    int coo=0;
    int coe=1;
    int exp=0;
    int dat=0;
    int tex=0;


    float limiar=0.3;

    int nivel=3;


    dados * d = new dados();
    dados * d2 = new dados();
    dados * d3 = new dados();

    for(int i=1;;i++){

        if(argv[1]==NULL){
            help();
            return 0;
        }

        if(argv[i]==NULL)break;

        char conf1[]="-f";
        if(igual(argv[i],conf1)==1){
            divide(argv[i+1],d);
        }

        char conf2[]="-nei";
        if(igual(argv[i],conf2)){
            if(argv[i+1][0]=='1')
                nei=1;
            if(argv[i+1][0]=='0')
                nei=0;
            if(argv[i+1][0]!='0' and argv[i+1][0]!='1'){
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf3[]="-fus";
        if(igual(argv[i],conf3)){
            if(argv[i+1][0]=='1')
                fus=1;
            if(argv[i+1][0]=='0')
                fus=0;
            if(argv[i+1][0]!='0' and argv[i+1][0]!='1'){
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf4[]="-coo";
        if(igual(argv[i],conf4)){
            if(argv[i+1][0]=='1')
                coo=1;
            if(argv[i+1][0]=='0')
                coo=0;
            if(argv[i+1][0]!='0' and argv[i+1][0]!='1'){
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf5[]="-coe";
        if(igual(argv[i],conf5)){
            if(argv[i+1][0]=='1')
                coe=1;
            if(argv[i+1][0]=='0')
                coe=0;
            if(argv[i+1][0]!='0' and argv[i+1][0]!='1'){
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf6[]="-exp";
        if(igual(argv[i],conf6)){
            if(argv[i+1][0]=='1')
                exp=1;
            if(argv[i+1][0]=='0')
                exp=0;
            if(argv[i+1][0]!='0' and argv[i+1][0]!='1'){
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf7[]="-dat";
        if(igual(argv[i],conf7)){
            if(argv[i+1][0]=='1')
                dat=1;
            if(argv[i+1][0]=='0')
                dat=0;
            if(argv[i+1][0]!='0' and argv[i+1][0]!='1'){
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf8[]="-tex";
        if(igual(argv[i],conf8)){
            if(argv[i+1][0]=='1')
                tex=1;
            if(argv[i+1][0]=='0')
                tex=0;
            if(argv[i+1][0]!='0' and argv[i+1][0]!='1'){
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf9[]="-li";
        if(igual(argv[i],conf9)){
            float aux=stof(argv[i+1]);
            if(aux>=0 and aux<=1){
                limiar=aux;
            }else{
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf10[]="-ni";
        if(igual(argv[i],conf10)){
            float aux=stof(argv[i+1]);
            if(aux>=0){
                nivel=aux;
            }else{
                cout<<"Wrong parameter"<<endl;
                return 0;
            }
        }

        char conf11[]="-HELP";
        char conf12[]="-help";
        if(igual(argv[i],conf12) or igual(argv[i],conf11)){
            help();
            return 0;
        }


    }

    cout<<endl;

    cout<<"-Entry Genes: "<<endl;
    d->imprime();

    cout<<"-Parâmetros: "<<endl;
    cout<<"Neighborhood: "<<nei<<endl;
    cout<<"Fusion: "<<fus<<endl;
    cout<<"Cooccurence: "<<coo<<endl;
    cout<<"Coexpression: "<<coe<<endl;
    cout<<"Experimental: "<<exp<<endl;
    cout<<"Database: "<<dat<<endl;
    cout<<"Textmining: "<<tex<<endl;

    cout<<endl;

    cout<<"-Threshold: "<<limiar<<endl;

    cout<<endl;

    cout<<"-Network Level: "<<nivel<<endl;

    cout<<endl;


    traduz(d,d2,nome);


    //processo

    dados * resp = new dados();

    cout<<"Processo "<<endl;

    adiciona(d2, m2, resp, nei, fus, coo, coe, exp, dat, tex, limiar, nivel, nome);

    cout<<endl;

    resp->imprime_s();

    return 0;
}
