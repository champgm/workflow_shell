FasdUAS 1.101.10   ��   ��    k             i         I     �� 	��
�� .aevtoappnull  �   � **** 	 J       
 
     o      ���� 0 atoken aToken      o      ���� 0 	autilnode 	aUtilNode   ��  o      ���� 0 	apassword 	aPassword��  ��    k     Y       r         I    �� ��
�� .sysoexecTEXT���     TEXT  m        �    w h o a m i��    o      ���� 0 username userName      l   ��������  ��  ��        I   �� ��
�� .sysodlogaskr        TEXT  l   	 ����  m    	   �  � O k a y   t o   e n t e r   t o k e n ?   I f   i t   r o l l e d   t o   t h e   n e x t   o n e ,   o r   i f   t h e   c u r r e n t   o n e   i s   a l m o s t   e x p i r e d ,   C L I C K   C A N C E L   a n d   r e c o v e r   m a n u a l l y !   O n c e   s u c c e s s f u l l y   l o g g e d   i n ,   y o u   m a y   e x i t   a n d   r u n   t h i s   s c r i p t   a g a i n   t o   t r y   a g a i n .  ��  ��  ��      ��   O    Y ! " ! k    X # #  $ % $ I   ������
�� .miscactvnull��� ��� null��  ��   %  & ' & n    ( ) ( I    �� *���� 0 waitforwindow waitForWindow *  +�� + m     , , � - - 
 i T e r m��  ��   )  f     '  . / . l   ��������  ��  ��   /  0 1 0 l   �� 2 3��   2 ' !set myterm to (make new terminal)    3 � 4 4 B s e t   m y t e r m   t o   ( m a k e   n e w   t e r m i n a l ) 1  5�� 5 O    X 6 7 6 k   & W 8 8  9 : 9 l  & &�� ; <��   ; &  launch session "Default Session"    < � = = @ l a u n c h   s e s s i o n   " D e f a u l t   S e s s i o n " :  >�� > O   & W ? @ ? k   - V A A  B C B I  - 4���� D
�� .ITRMWrtenull���    obj ��   D �� E��
�� 
iTxt E o   / 0���� 0 atoken aToken��   C  F G F I  5 :�� H��
�� .sysodelanull��� ��� nmbr H m   5 6���� ��   G  I J I I  ; H���� K
�� .ITRMWrtenull���    obj ��   K �� L��
�� 
iTxt L b   = D M N M b   = B O P O b   = @ Q R Q m   = > S S � T T  s s h   R o   > ?���� 0 username userName P m   @ A U U � V V  @ N o   B C���� 0 	autilnode 	aUtilNode��   J  W X W I  I N�� Y��
�� .sysodelanull��� ��� nmbr Y m   I J���� ��   X  Z�� Z I  O V���� [
�� .ITRMWrtenull���    obj ��   [ �� \��
�� 
iTxt \ o   Q R���� 0 	apassword 	aPassword��  ��   @ l  & * ]���� ] 4  & *�� ^
�� 
Pssn ^ m   ( )��������  ��  ��   7 l   # _���� _ 4   #�� `
�� 
Ptrm ` m   ! "���� ��  ��  ��   " m     a a�                                                                                  ITRM  alis    H  Macintosh HD               Ѻ�ZH+     �	iTerm.app                                                       �g�7H<        ����  	                Applications    ѻ�      �7��       �  $Macintosh HD:Applications: iTerm.app   	 i T e r m . a p p    M a c i n t o s h   H D  Applications/iTerm.app  / ��  ��     b c b l     ��������  ��  ��   c  d�� d i     e f e I      �� g���� 0 waitforwindow waitForWindow g  h�� h o      ���� 0 appname appName��  ��   f k     1 i i  j k j l     �� l m��   l 0 * Poll until "appName" is the active window    m � n n T   P o l l   u n t i l   " a p p N a m e "   i s   t h e   a c t i v e   w i n d o w k  o p o r      q r q m      s s � t t 
 n o A p p r o      ���� 0 	activeapp 	activeApp p  u�� u W    1 v w v k    , x x  y z y r     { | { l    }���� } I   �� ~ 
�� .earsffdralis        afdr ~ m    ��
�� appfegfp  �� ���
�� 
rtyp � m    ��
�� 
utxt��  ��  ��   | o      ���� 0 	activeapp 	activeApp z  � � � l   �� � ���   � ; 5 If the active app name does not contain the target,     � � � � j   I f   t h e   a c t i v e   a p p   n a m e   d o e s   n o t   c o n t a i n   t h e   t a r g e t ,   �  � � � l   �� � ���   �    try to activate it again.    � � � � 4   t r y   t o   a c t i v a t e   i t   a g a i n . �  ��� � Z    , � ��� � � H     � � E    � � � o    ���� 0 	activeapp 	activeApp � o    ���� 0 appname appName � k    ( � �  � � � I   "�� ���
�� .sysodelanull��� ��� nmbr � m     � � ?���������   �  ��� � I  # (������
�� .miscactvnull��� ��� null��  ��  ��  ��   �  S   + ,��   w =    � � � o    	���� 0 	activeapp 	activeApp � o   	 
���� 0 appname appName��  ��       �� � � � �����   � ��������
�� .aevtoappnull  �   � ****�� 0 waitforwindow waitForWindow�� 0 username userName��   � �� ���� � ���
�� .aevtoappnull  �   � ****�� �� ���  �  �������� 0 atoken aToken�� 0 	autilnode 	aUtilNode�� 0 	apassword 	aPassword��   � �������� 0 atoken aToken�� 0 	autilnode 	aUtilNode�� 0 	apassword 	aPassword �  ���� �� a�� ,������������ S U
�� .sysoexecTEXT���     TEXT�� 0 username userName
�� .sysodlogaskr        TEXT
�� .miscactvnull��� ��� null�� 0 waitforwindow waitForWindow
�� 
Ptrm
�� 
Pssn
�� 
iTxt
�� .ITRMWrtenull���    obj 
�� .sysodelanull��� ��� nmbr�� Z�j E�O�j O� H*j O)�k+ O*�k/ 3*�i/ +*�l Omj O*���%�%�%l Omj O*�l UUU � �� f���� � ����� 0 waitforwindow waitForWindow�� �� ���  �  ���� 0 appname appName��   � ��~� 0 appname appName�~ 0 	activeapp 	activeApp �  s�}�|�{�z ��y�x
�} appfegfp
�| 
rtyp
�{ 
utxt
�z .earsffdralis        afdr
�y .sysodelanull��� ��� nmbr
�x .miscactvnull��� ��� null�� 2�E�O ,h�� ���l E�O�� �j O*j Y [OY�� � � � �  m c 0 2 3 2 1 9��  ascr  ��ޭ