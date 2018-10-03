#ifndef KDTREE_H
#define KDTREE_H
#include<QDebug>

#include <QObject>
#include <list>
#include "Point.h"
#include "Scene.h"
#include "boundrect.h"
#include <algorithm>
#include <vector>
#include "node.h"
#include"math.h"
using namespace std;

class KDTree
{
public:
    //    vector<BoundRect*> position;
    QList<BoundRect*> positionList;
    Node *head;
public:
    KDTree(Scene *scene){
        vector<BoundRect*> position=scene->getKDTreeDataSet();
        for(int i=0;i<position.size();i++){
            positionList.append(position.at(i));
        }
        sortPositionByX(positionList);
        formTree();
        printKDTree();
        //        qSort(positionList.begin(),positionList.end(),[](const BoundRect *b1,const BoundRect *b2){
        //            if(b1->centre->x>b2->centre->x){
        //                return true;
        //            }else{
        //                return false;
        //            }
        //        });
        //        sort(position.begin(),position.end(),[](const BoundRect *b1,const BoundRect *b2){
        //            if(b1->centre->x>b2->centre->x){
        //                return true;
        //            }else{
        //                return false;
        //            }
        //        });
        //        for(int i=0;i<position.size();i++){
        //            qDebug()<<"position:"<<position[i]->centre->x<<","<<position[i]->centre->y;
        //        }
    }
    void sortPositionByX(QList<BoundRect*> &pos){
        qSort(pos.begin(),pos.end(),[](const BoundRect *b1,const BoundRect *b2){
            if(b1->centre->x>b2->centre->x){
                return true;
            }else{
                return false;
            }
        });
    }
    void sortPositionByY(QList<BoundRect*> &pos){
        qSort(pos.begin(),pos.end(),[](const BoundRect *b1,const BoundRect *b2){
            if(b1->centre->y>b2->centre->y){
                return true;
            }else{
                return false;
            }
        });
    }
    //    bool sortByX(const BoundRect *b1,const BoundRect *b2){
    //        if(b1->centre->x>b2->centre->x){
    //            return true;
    //        }else{
    //            return false;
    //        }
    //    }

    bool calVariance(QList<BoundRect*> pos){
        double sumX=0,sumY=0;
        for(int i=0;i<pos.size();i++){
            sumX+=pos.at(i)->centre->x;
            sumY+=pos.at(i)->centre->y;
        }
        double meanX=sumX/pos.size(),meanY=sumY/pos.size();
        double varX=0,varY=0;
        for(int i=0;i<pos.size();i++){
            varX+=(pos.at(i)->centre->x-meanX)*(pos.at(i)->centre->x-meanX);
            varY+=(pos.at(i)->centre->y-meanY)*(pos.at(i)->centre->y-meanY);
        }
        if(varX>varY){
            return true;
        }else{
            return false;
        }
    }

    void formTree(){
        if(calVariance(positionList)){
            sortPositionByX(positionList);
        }else{
            sortPositionByY(positionList);
        }
        head->value=positionList.at(positionList.size()/2);
        head->left=formNode(positionList.mid(0,positionList.size()/2));
        head->right=formNode(positionList.mid(positionList.size()/2+1));
    }
    Node* formNode(QList<BoundRect*> pos){
//        qDebug()<<"pos.size="<<pos.size();
        if(pos.size()==0){
            return nullptr;
        }else if(pos.size()==1){
            return new Node(pos.at(0));
        }
        if(calVariance(pos)){
            sortPositionByX(pos);
        }else{
            sortPositionByY(pos);
        }
        Node* begin=new Node(pos.at(pos.size()/2));
        begin->left=formNode(pos.mid(0,pos.size()/2));
        begin->right=formNode(pos.mid(pos.size()/2+1));
        return begin;
    }
    void printKDTree(){
        QList<Node*> nodeList;
        nodeList.append(head);
        int k=0;
        while (nodeList.size()>0) {
            printKDTreeNode(nodeList,k);
            k++;
        }
    }
    void printKDTreeNode(QList<Node*> &nodeList,int k){
        int currentSize=nodeList.size();
        qDebug()<<k<<","<<currentSize;
        for(int i=0;i<currentSize;i++){
            if(nodeList.at(0)->value==0x0){
                nodeList.pop_front();
                continue;
            }
            nodeList.at(0)->value->toString();
            //Node *temp=nodeList.pop_front();
//            qDebug()<<nodeList.at(0)->right->value;
            if(nodeList.at(0)->left!=nullptr)
                nodeList.push_back(nodeList.at(0)->left);
            if(nodeList.at(0)->right!=nullptr)
                nodeList.push_back(nodeList.at(0)->right);
            nodeList.pop_front();
        }
    }
};

#endif // KDTREE_H
