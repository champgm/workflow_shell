FasdUAS 1.101.10   ��   ��    k             i         I     �� 	��
�� .aevtoappnull  �   � **** 	 J       
 
     o      ���� 0 atoken aToken      o      ���� 0 	autilnode 	aUtilNode   ��  o      ���� 0 	apassword 	aPassword��  ��    k     Y       l     ��  ��    E ? Login as the local username... this might need to change later     �   ~   L o g i n   a s   t h e   l o c a l   u s e r n a m e . . .   t h i s   m i g h t   n e e d   t o   c h a n g e   l a t e r      r         I    �� ��
�� .sysoexecTEXT���     TEXT  m        �    w h o a m i��    o      ���� 0 username userName      l   ��������  ��  ��         l   �� ! "��   ! p j Display a warning. As far as I can tell, there's no way to check if the PIN has rolled over unexpectedly.    " � # # �   D i s p l a y   a   w a r n i n g .   A s   f a r   a s   I   c a n   t e l l ,   t h e r e ' s   n o   w a y   t o   c h e c k   i f   t h e   P I N   h a s   r o l l e d   o v e r   u n e x p e c t e d l y .    $ % $ l   �� & '��   & + % We will need some user input to tell    ' � ( ( J   W e   w i l l   n e e d   s o m e   u s e r   i n p u t   t o   t e l l %  ) * ) I   �� +��
�� .sysodlogaskr        TEXT + l   	 ,���� , m    	 - - � . .� O k a y   t o   e n t e r   t o k e n ?   I f   i t   r o l l e d   t o   t h e   n e x t   o n e ,   o r   i f   t h e   c u r r e n t   o n e   i s   a l m o s t   e x p i r e d ,   C L I C K   C A N C E L   a n d   r e c o v e r   m a n u a l l y !   O n c e   s u c c e s s f u l l y   l o g g e d   i n ,   y o u   m a y   e x i t   a n d   r u n   t h i s   s c r i p t   a g a i n   t o   t r y   a g a i n .  ��  ��  ��   *  / 0 / l   ��������  ��  ��   0  1 2 1 l   �� 3 4��   3   Focus iTerm    4 � 5 5    F o c u s   i T e r m 2  6�� 6 O    Y 7 8 7 k    X 9 9  : ; : I   ������
�� .miscactvnull��� ��� null��  ��   ;  < = < n    > ? > I    �� @���� 0 waitforwindow waitForWindow @  A�� A m     B B � C C 
 i T e r m��  ��   ?  f     =  D E D l   ��������  ��  ��   E  F G F l   �� H I��   H ` Zset myterm to (make new terminal) -- dont remember what this does, commenting out for now.    I � J J � s e t   m y t e r m   t o   ( m a k e   n e w   t e r m i n a l )   - -   d o n t   r e m e m b e r   w h a t   t h i s   d o e s ,   c o m m e n t i n g   o u t   f o r   n o w . G  K�� K O    X L M L O   & W N O N k   - V P P  Q R Q I  - 4���� S
�� .ITRMWrtenull���    obj ��   S �� T��
�� 
iTxt T o   / 0���� 0 atoken aToken��   R  U V U I  5 :�� W��
�� .sysodelanull��� ��� nmbr W m   5 6���� ��   V  X Y X I  ; H���� Z
�� .ITRMWrtenull���    obj ��   Z �� [��
�� 
iTxt [ b   = D \ ] \ b   = B ^ _ ^ b   = @ ` a ` m   = > b b � c c  s s h   a o   > ?���� 0 username userName _ m   @ A d d � e e  @ ] o   B C���� 0 	autilnode 	aUtilNode��   Y  f g f I  I N�� h��
�� .sysodelanull��� ��� nmbr h m   I J���� ��   g  i�� i I  O V���� j
�� .ITRMWrtenull���    obj ��   j �� k��
�� 
iTxt k o   Q R���� 0 	apassword 	aPassword��  ��   O l  & * l���� l 4  & *�� m
�� 
Pssn m m   ( )��������  ��   M l   # n���� n 4   #�� o
�� 
Ptrm o m   ! "���� ��  ��  ��   8 m     p p�                                                                                  ITRM  alis    H  Macintosh HD               Ѻ�ZH+     �	iTerm.app                                                       �g�7H<        ����  	                Applications    ѻ�      �7��       �  $Macintosh HD:Applications: iTerm.app   	 i T e r m . a p p    M a c i n t o s h   H D  Applications/iTerm.app  / ��  ��     q r q l     ��������  ��  ��   r  s t s l     �� u v��   u , & Waits for a window to come into focus    v � w w L   W a i t s   f o r   a   w i n d o w   t o   c o m e   i n t o   f o c u s t  x�� x i     y z y I      �� {���� 0 waitforwindow waitForWindow {  |�� | o      ���� 0 appname appName��  ��   z k     1 } }  ~  ~ l     �� � ���   � 0 * Poll until "appName" is the active window    � � � � T   P o l l   u n t i l   " a p p N a m e "   i s   t h e   a c t i v e   w i n d o w   � � � r      � � � m      � � � � � 
 n o A p p � o      ���� 0 	activeapp 	activeApp �  ��� � W    1 � � � k    , � �  � � � r     � � � l    ����� � I   �� � �
�� .earsffdralis        afdr � m    ��
�� appfegfp � �� ���
�� 
rtyp � m    ��
�� 
utxt��  ��  ��   � o      ���� 0 	activeapp 	activeApp �  � � � l   �� � ���   � ; 5 If the active app name does not contain the target,     � � � � j   I f   t h e   a c t i v e   a p p   n a m e   d o e s   n o t   c o n t a i n   t h e   t a r g e t ,   �  � � � l   �� � ���   �    try to activate it again.    � � � � 4   t r y   t o   a c t i v a t e   i t   a g a i n . �  ��� � Z    , � ��� � � H     � � E    � � � o    ���� 0 	activeapp 	activeApp � o    ���� 0 appname appName � k    ( � �  � � � I   "�� ���
�� .sysodelanull��� ��� nmbr � m     � � ?���������   �  ��� � I  # (������
�� .miscactvnull��� ��� null��  ��  ��  ��   � k   + , � �  � � � l  + +�� � ���   �   Done    � � � � 
   D o n e �  ��� �  S   + ,��  ��   � =    � � � o    	���� 0 	activeapp 	activeApp � o   	 
���� 0 appname appName��  ��       �� � � ���   � ����
�� .aevtoappnull  �   � ****�� 0 waitforwindow waitForWindow � �� ���� � ���
�� .aevtoappnull  �   � ****�� �� ���  �  �������� 0 atoken aToken�� 0 	autilnode 	aUtilNode�� 0 	apassword 	aPassword��   � �������� 0 atoken aToken�� 0 	autilnode 	aUtilNode�� 0 	apassword 	aPassword �  ���� -�� p�� B������������ b d
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
�� .sysodelanull��� ��� nmbr�� Z�j E�O�j O� H*j O)�k+ O*�k/ 3*�i/ +*�l Omj O*���%�%�%l Omj O*�l UUU � �� z��~ � ��}�� 0 waitforwindow waitForWindow� �| ��|  �  �{�{ 0 appname appName�~   � �z�y�z 0 appname appName�y 0 	activeapp 	activeApp �  ��x�w�v�u ��t�s
�x appfegfp
�w 
rtyp
�v 
utxt
�u .earsffdralis        afdr
�t .sysodelanull��� ��� nmbr
�s .miscactvnull��� ��� null�} 2�E�O ,h�� ���l E�O�� �j O*j Y [OY�� ascr  ��ޭ