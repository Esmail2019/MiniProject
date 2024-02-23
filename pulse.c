#include <stdio.h>
#include <reg52.h>

sbit op1 = P1 ^ 0;

void main()
{
    op1 = 0; // d3claring as op pin
    while (1)
    {
        op1 = 1;
        delay();
        op1 = 0;
        delay();
    }
}

void delay()
{
    TMOD = 0x01; // timer 0 mode 1
    TH0 = 0xDC;  // count for 10ms is loaded
    TL0 = 0x00;
    TR0 = 1; // start the timer
    while (TF0 == 0)
    /// 65535 ---- > 0 OVERFLOW
    {
        ;
    }
    TR0 = 0; // end timer
    TF = 0;
}