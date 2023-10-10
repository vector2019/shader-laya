#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif


#ifdef ALBEDOCOLOR
    uniform vec4 u_AlbedoColor;
#endif

varying vec4 v_color;


void main(){
    highp vec4 color = vec4(0.555,0.55555,0.5555,1.0);

    #ifdef ALBEDOCOLOR
        color = u_AlbedoColor;
    #endif


    gl_FragColor = color;
}