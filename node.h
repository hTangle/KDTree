#ifndef NODE_H
#define NODE_H
#include "boundrect.h"

class Node
{
public:
    BoundRect* value=nullptr;
    Node *left=nullptr;
    Node *right=nullptr;
public:
    Node() {}
    Node(BoundRect *v){
        value=v;
    }
};
#endif // NODE_H
