FasdUAS 1.101.10   ��   ��    k             i         I     �� 	��
�� .aevtoappnull  �   � **** 	 o      ���� 0 apin aPin��    k     � 
 
     Z     �  ��   ?        n         1    ��
�� 
leng  o     ���� 0 apin aPin  m    ����    k    �       l   ��  ��     set thePin to aPin     �   $ s e t   t h e P i n   t o   a P i n      r        m    	   �    S e c u r I D  o      ���� 0 appname appName     !   l   ��������  ��  ��   !  " # " l   �� $ %��   $ ; 5 Check if SecurID is already started. If so, kill it.    % � & & j   C h e c k   i f   S e c u r I D   i s   a l r e a d y   s t a r t e d .   I f   s o ,   k i l l   i t . #  ' ( ' l   �� ) *��   ) 9 3 We are doing this because there is no way to tell     * � + + f   W e   a r e   d o i n g   t h i s   b e c a u s e   t h e r e   i s   n o   w a y   t o   t e l l   (  , - , l   �� . /��   . > 8 which button or field in SecurID is currently in focus.    / � 0 0 p   w h i c h   b u t t o n   o r   f i e l d   i n   S e c u r I D   i s   c u r r e n t l y   i n   f o c u s . -  1 2 1 l   �� 3 4��   3 @ : Killing it and reopening it will focus the pin entry box.    4 � 5 5 t   K i l l i n g   i t   a n d   r e o p e n i n g   i t   w i l l   f o c u s   t h e   p i n   e n t r y   b o x . 2  6 7 6 r     8 9 8 I    ��������  0 getprocesslist getProcessList��  ��   9 o      ���� 0 processlist ProcessList 7  : ; : O    3 < = < k    2 > >  ? @ ? l   �� A B��   A . (set ProcessList to name of every process    B � C C P s e t   P r o c e s s L i s t   t o   n a m e   o f   e v e r y   p r o c e s s @  D�� D Z    2 E F���� E E    G H G o    ���� 0 processlist ProcessList H o    ���� 0 appname appName F k    . I I  J K J r    & L M L n    $ N O N 1   " $��
�� 
idux O 4    "�� P
�� 
prcs P o     !���� 0 appname appName M o      ���� 0 thepid ThePID K  Q�� Q I  ' .�� R��
�� .sysoexecTEXT���     TEXT R b   ' * S T S m   ' ( U U � V V  k i l l   - K I L L   T o   ( )���� 0 thepid ThePID��  ��  ��  ��  ��   = m     W W�                                                                                  sevs  alis    �  Macintosh HD               Ѻ�ZH+     *System Events.app                                               �W�2�'        ����  	                CoreServices    ѻ�      �2�w       *        =Macintosh HD:System: Library: CoreServices: System Events.app   $  S y s t e m   E v e n t s . a p p    M a c i n t o s h   H D  -System/Library/CoreServices/System Events.app   / ��   ;  X Y X l  4 4��������  ��  ��   Y  Z [ Z l  4 4�� \ ]��   \ + % Wait until SecurID finishes closing.    ] � ^ ^ J   W a i t   u n t i l   S e c u r I D   f i n i s h e s   c l o s i n g . [  _ ` _ r   4 ; a b a I   4 9��������  0 getprocesslist getProcessList��  ��   b o      ���� 0 processlist ProcessList `  c d c W   < Q e f e r   E L g h g I   E J��������  0 getprocesslist getProcessList��  ��   h o      ���� 0 processlist ProcessList f H   @ D i i E  @ C j k j o   @ A���� 0 processlist ProcessList k o   A B���� 0 appname appName d  l m l l  R R��������  ��  ��   m  n o n l  R R��������  ��  ��   o  p q p l  R R�� r s��   r   Start it up again.    s � t t &   S t a r t   i t   u p   a g a i n . q  u v u l  R Z w x y w I  R Z�� z��
�� .miscactvnull��� ��� null z 4   R V�� {
�� 
capp { o   T U���� 0 appname appName��   x   restart app    y � | |    r e s t a r t   a p p v  } ~ } l  [ [��������  ��  ��   ~   �  l  [ [�� � ���   � #  Wait until it is open again.    � � � � :   W a i t   u n t i l   i t   i s   o p e n   a g a i n . �  � � � r   [ b � � � I   [ `��������  0 getprocesslist getProcessList��  ��   � o      ���� 0 processlist ProcessList �  � � � W   c w � � � r   k r � � � I   k p��������  0 getprocesslist getProcessList��  ��   � o      ���� 0 processlist ProcessList � E  g j � � � o   g h���� 0 processlist ProcessList � o   h i���� 0 appname appName �  � � � l  x x��������  ��  ��   �  ��� � O   x � � � � k    � � �  � � � l   �� � ���   � !  Try to activate the window    � � � � 6   T r y   t o   a c t i v a t e   t h e   w i n d o w �  � � � I   �������
�� .miscactvnull��� ��� null��  ��   �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � &   Wait for SecurID to be in focus    � � � � @   W a i t   f o r   S e c u r I D   t o   b e   i n   f o c u s �  � � � n  � � � � � I   � ��� ����� 0 waitforwindow waitForWindow �  ��� � o   � ����� 0 appname appName��  ��   �  f   � � �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   �   Mush buttons in the app    � � � � 0   M u s h   b u t t o n s   i n   t h e   a p p �  � � � O   � � � � � k   � � � �  � � � l  � � � � � � I  � ��� ���
�� .prcskprsnull���     ctxt � o   � ����� 0 apin aPin��   �   type the pin number    � � � � (   t y p e   t h e   p i n   n u m b e r �  � � � l  � � � � � � I  � ��� ���
�� .prcskcodnull���     **** � m   � ����� $��   �   return key    � � � �    r e t u r n   k e y �  � � � l  � � � � � � I  � ��� ���
�� .sysodelanull��� ��� nmbr � m   � � � � ?�333333��   �   wait for token appear    � � � � ,   w a i t   f o r   t o k e n   a p p e a r �  � � � l  � � � � � � I  � ��� ���
�� .prcskcodnull���     **** � m   � ����� 0��   �  
 press tab    � � � �    p r e s s   t a b �  ��� � l  � � � � � � I  � ��� ���
�� .prcskcodnull���     **** � m   � ����� 1��   � %  space (to hit the copy button)    � � � � >   s p a c e   ( t o   h i t   t h e   c o p y   b u t t o n )��   � m   � � � ��                                                                                  sevs  alis    �  Macintosh HD               Ѻ�ZH+     *System Events.app                                               �W�2�'        ����  	                CoreServices    ѻ�      �2�w       *        =Macintosh HD:System: Library: CoreServices: System Events.app   $  S y s t e m   E v e n t s . a p p    M a c i n t o s h   H D  -System/Library/CoreServices/System Events.app   / ��   �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � l f Sometimes calling "the clipboard" right after you put something on it causes applescript to go crazy.    � � � � �   S o m e t i m e s   c a l l i n g   " t h e   c l i p b o a r d "   r i g h t   a f t e r   y o u   p u t   s o m e t h i n g   o n   i t   c a u s e s   a p p l e s c r i p t   t o   g o   c r a z y . �  � � � l  � ��� � ���   � T N The best solution seems to be to delay a bit between copy and get operations.    � � � � �   T h e   b e s t   s o l u t i o n   s e e m s   t o   b e   t o   d e l a y   a   b i t   b e t w e e n   c o p y   a n d   g e t   o p e r a t i o n s . �  � � � I  � ��� ���
�� .sysodelanull��� ��� nmbr � m   � ����� ��   �  � � � r   � � � � � I  � �������
�� .JonsgClp****    ��� null��  ��   � o      ���� 	0 token   �  � � � L   � � � � o   � ����� 	0 token   �  ��� � l  � ���������  ��  ��  ��   � 4   x |�� �
�� 
capp � o   z {���� 0 appname appName��  ��    k   � � � �  � � � l  � �� � ��   � R L Parameter check... this if should probably be swapped so this is at the top    � � � � �   P a r a m e t e r   c h e c k . . .   t h i s   i f   s h o u l d   p r o b a b l y   b e   s w a p p e d   s o   t h i s   i s   a t   t h e   t o p �  ��~ � I  � ��} ��|
�} .sysodlogaskr        TEXT � m   � � � � � � � X Y o u   m u s t   p r o v i d e   a   v a l i d   P I N   a s   a n   a r g u m e n t .�|  �~     ��{ � L   � � � � o   � ��z�z 	0 token  �{     � � � l     �y�x�w�y  �x  �w   �    l     �v�v   ) # Return a list of running processes    � F   R e t u r n   a   l i s t   o f   r u n n i n g   p r o c e s s e s  i     I      �u�t�s�u  0 getprocesslist getProcessList�t  �s   k     		 

 O      r     n    	 1    	�r
�r 
pnam 2    �q
�q 
prcs o      �p�p 0 processlist ProcessList m     �                                                                                  sevs  alis    �  Macintosh HD               Ѻ�ZH+     *System Events.app                                               �W�2�'        ����  	                CoreServices    ѻ�      �2�w       *        =Macintosh HD:System: Library: CoreServices: System Events.app   $  S y s t e m   E v e n t s . a p p    M a c i n t o s h   H D  -System/Library/CoreServices/System Events.app   / ��   �o L     o    �n�n 0 processlist ProcessList�o    l     �m�l�k�m  �l  �k    l     �j�j   , & Waits for a window to come into focus    � L   W a i t s   f o r   a   w i n d o w   t o   c o m e   i n t o   f o c u s  i     I      �i �h�i 0 waitforwindow waitForWindow  !�g! o      �f�f 0 appname appName�g  �h   k     1"" #$# l     �e%&�e  % 0 * Poll until "appName" is the active window   & �'' T   P o l l   u n t i l   " a p p N a m e "   i s   t h e   a c t i v e   w i n d o w$ ()( r     *+* m     ,, �-- 
 n o A p p+ o      �d�d 0 	activeapp 	activeApp) .�c. W    1/0/ k    ,11 232 r    454 l   6�b�a6 I   �`78
�` .earsffdralis        afdr7 m    �_
�_ appfegfp8 �^9�]
�^ 
rtyp9 m    �\
�\ 
utxt�]  �b  �a  5 o      �[�[ 0 	activeapp 	activeApp3 :;: l   �Z<=�Z  < ; 5 If the active app name does not contain the target,    = �>> j   I f   t h e   a c t i v e   a p p   n a m e   d o e s   n o t   c o n t a i n   t h e   t a r g e t ,  ; ?@? l   �YAB�Y  A    try to activate it again.   B �CC 4   t r y   t o   a c t i v a t e   i t   a g a i n .@ DED Z    &FG�XHF H    II E   JKJ o    �W�W 0 	activeapp 	activeAppK o    �V�V 0 appname appNameG I   "�U�T�S
�U .miscactvnull��� ��� null�T  �S  �X  H k   % &LL MNM l  % %�ROP�R  O   Done   P �QQ 
   D o n eN R�QR  S   % &�Q  E S�PS I  ' ,�OT�N
�O .sysodelanull��� ��� nmbrT m   ' (UU ?��������N  �P  0 =   VWV o    	�M�M 0 	activeapp 	activeAppW o   	 
�L�L 0 appname appName�c   XYX l     �K�J�I�K  �J  �I  Y Z�HZ l     �G�F�E�G  �F  �E  �H       �D[\]^ _�C`�B�A�@�?�>�D  [ �=�<�;�:�9�8�7�6�5�4�3�2
�= .aevtoappnull  �   � ****�<  0 getprocesslist getProcessList�; 0 waitforwindow waitForWindow�: 0 appname appName�9 0 processlist ProcessList�8 0 thepid ThePID�7 	0 token  �6  �5  �4  �3  �2  \ �1 �0�/ab�.
�1 .aevtoappnull  �   � ****�0 0 apin aPin�/  a �-�- 0 apin aPinb �, �+�*�) W�(�'�& U�%�$�#�"�!� � ������ ��
�, 
leng�+ 0 appname appName�*  0 getprocesslist getProcessList�) 0 processlist ProcessList
�( 
prcs
�' 
idux�& 0 thepid ThePID
�% .sysoexecTEXT���     TEXT
�$ 
capp
�# .miscactvnull��� ��� null�" 0 waitforwindow waitForWindow
�! .prcskprsnull���     ctxt�  $
� .prcskcodnull���     ****
� .sysodelanull��� ��� nmbr� 0� 1
� .JonsgClp****    ��� null� 	0 token  
� .sysodlogaskr        TEXT�. ܠ�,j ��E�O*j+ E�O� �� *��/�,E�O��%j 
Y hUO*j+ E�O h��*j+ E�[OY��O*��/j O*j+ E�O h��*j+ E�[OY��O*��/ N*j O)�k+ O� %�j O�j Oa j Oa j Oa j UOkj O*j E` O_ OPUY 	a j O_ ] ���cd��  0 getprocesslist getProcessList�  �  c �� 0 processlist ProcessListd ��
� 
prcs
� 
pnam� � 	*�-�,E�UO�^ ���ef�� 0 waitforwindow waitForWindow� �g� g  �� 0 appname appName�  e ��
� 0 appname appName�
 0 	activeapp 	activeAppf ,�	����U�
�	 appfegfp
� 
rtyp
� 
utxt
� .earsffdralis        afdr
� .miscactvnull��� ��� null
� .sysodelanull��� ��� nmbr� 2�E�O ,h�� ���l E�O�� 
*j Y O�j [OY��_ �h� Lh L ijklmnopqrstuvwxyz{|}~�����������������������������������������������������i ���  l o g i n w i n d o wj ���  A R D A g e n tk ���  f i r e f o xl ���  i d e am ���  G o o g l e   C h r o m en ���  i T e r m 2o ��� 0 M i c r o s o f t   R e m o t e   D e s k t o pp ��� " M i c r o s o f t   O u t l o o kq ���  K e e P a s s Xr ���  C i t r i x   V i e w e rs ���  M i c r o s o f t   L y n ct ��� 
 S l a c ku ���  S u b l i m e   T e x t   2v ���  S p o t i f yw ���  T e r m i n a lx ���   A c t i v i t y   M o n i t o ry ���  S y s t e m U I S e r v e rz ���  D o c k{ ���  A i r P l a y U I A g e n t| ���  F i n d e r} ���  s h a r i n g d~ ��� & C o r e S e r v i c e s U I A g e n t ��� ( c o m . a p p l e . d o c k . e x t r a� ���  S p o t l i g h t� ��� 4 c o m . a p p l e . i n t e r n e t a c c o u n t s� ��� 2 M i c r o s o f t   D a t a b a s e   D a e m o n� ���  S p o t i f y   H e l p e r� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� & M i c r o s o f t   A U   D a e m o n� ���  i T u n e s H e l p e r� ���  F l u x� ��� $ N o t i f i c a t i o n C e n t e r� ��� $ C r a s h P l a n   m e n u   b a r� ���  A l f r e d   2� ��� 8 K e y c h a i n   C i r c l e   N o t i f i c a t i o n� ���  T I S w i t c h e r� ���  D r o p b o x� ��� 6 A n d r o i d   F i l e   T r a n s f e r   A g e n t� ��� $ U S B O v e r d r i v e H e l p e r� ���  S e r v i c e R e c o r d s� ���  G o o g l e   D r i v e� ���  M c A f e e   R e p o r t e r� ���  M e n u l e t� ���  R e c e i v e r H e l p e r� ���  c l o u d p h o t o s d� ���  W i F i A g e n t� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� ( G o o g l e   C h r o m e   H e l p e r� ���  A u t h M a n a g e r _ M a c� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� , F i n d e r S y n c A P I E x t e n s i o n� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� * c o m . a p p l e . q t k i t s e r v e r� ���  L a t e r A g e n t� ���  g a r c o n� ��� . I m a g e   C a p t u r e   E x t e n s i o n� ��� . M i c r o s o f t   A l e r t s   D a e m o n� ���  P r e s s A n d H o l d� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� ( G o o g l e   C h r o m e   H e l p e r� ���  S c r i p t   E d i t o r� ���  B e t t e r T o u c h T o o l� ���  B T T R e l a u n c h� ���  S y s t e m   E v e n t s� ���  S a f a r i� ��� 6 c o m . a p p l e . W e b K i t . N e t w o r k i n g� ��� 6 c o m . a p p l e . W e b K i t . W e b C o n t e n t� ��� 6 c o m . a p p l e . W e b K i t . W e b C o n t e n t� ��� ( G o o g l e   C h r o m e   H e l p e r� ��� 6 c o m . a p p l e . W e b K i t . W e b C o n t e n t� ���  o s a s c r i p t� �    S e c u r I D�C)�` �  3 8 0 6 0 5 7 6�B  �A  �@  �?  �>   ascr  ��ޭ