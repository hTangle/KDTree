import QtQuick 2.4
import QtCanvas3D 1.1
import QtQuick.Controls 2.0
import QtQuick.Window 2.2
import io.qt.examples.backend 1.0
import "glcode.js" as GLCode

Window {
    title: qsTr("Backend")
    width: 640
    height: 360
    visible: true
    BackEnd {
        id: backend
    }
    Canvas3D {
        id: canvas3d
        anchors.fill: parent
        focus: true

        onInitializeGL: {
            var centreX=backend.getListX();
            var centreY=backend.getListY();
            GLCode.initializeGL(canvas3d,centreX,centreY);
        }

        onPaintGL: {
            GLCode.paintGL(canvas3d);
        }

        onResizeGL: {
            GLCode.resizeGL(canvas3d);
        }
    }
//    Rectangle{
//        id:rect2;
//        TextField {
//            text: backend.userName
//            placeholderText: qsTr("User name")
//            anchors.centerIn: parent

//            onTextChanged: {

//                backend.userName = text
//                console.log(backend.userName);
//                var centreX=backend.getListX();
//                var centreY=backend.getListY();
//                for(var i=0;i<centreX.length;i++){
//                    console.log(centreX[i],centreY[i]);
//                }
//            }
//        }
//    }
//    Rectangle{
//        anchors.top:rect2.bottom;
//        Canvas3D {
//            id: canvas3d
//            anchors.fill: parent
//            focus: true

//            onInitializeGL: {
//                GLCode.initializeGL(canvas3d);
//            }

//            onPaintGL: {
//                GLCode.paintGL(canvas3d);
//            }

//            onResizeGL: {
//                GLCode.resizeGL(canvas3d);
//            }
//        }
//    }
}
