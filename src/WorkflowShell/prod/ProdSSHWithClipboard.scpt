FasdUAS 1.101.10   ��   ��    k             i         I     �� 	��
�� .aevtoappnull  �   � **** 	 J       
 
     o      ���� 0 agateway aGateway      o      ���� 0 	autilnode 	aUtilNode      o      ���� 0 	apassword 	aPassword   ��  o      ���� 0 
atokencode 
aTokenCode��  ��    k     �       r         I    �� ��
�� .sysoexecTEXT���     TEXT  m        �    w h o a m i��    o      ���� 0 username userName      l   ��������  ��  ��        r        m    	     � ! ! 
 B E G I N  o      ���� 0 logvar logVar   " # " l   �� $ %��   $ = 7set logVar to my logout(logVar, "gateway: " & aGateway)    % � & & n s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " g a t e w a y :   "   &   a G a t e w a y ) #  ' ( ' l   �� ) *��   ) ; 5set logVar to my logout(logVar, "util: " & aUtilNode)    * � + + j s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " u t i l :   "   &   a U t i l N o d e ) (  , - , l   �� . /��   . ; 5set logVar to my logout(logVar, "pass: " & aPassword)    / � 0 0 j s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " p a s s :   "   &   a P a s s w o r d ) -  1 2 1 l   �� 3 4��   3 A ;set logVar to my logout(logVar, "tokencode: " & aTokenCode)    4 � 5 5 v s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " t o k e n c o d e :   "   &   a T o k e n C o d e ) 2  6 7 6 l   ��������  ��  ��   7  8 9 8 l   �� : ;��   :   Start or activate iTerm    ; � < < 0   S t a r t   o r   a c t i v a t e   i T e r m 9  = > = r     ? @ ? m     A A � B B 
 e m p t y @ o      ���� 	0 myvar   >  C D C O    � E F E k    � G G  H I H I   ������
�� .miscactvnull��� ��� null��  ��   I  J K J l   ��������  ��  ��   K  L�� L O    � M N M k   ! � O O  P Q P l  ! !�� R S��   R ? 9 Create a new tab, which will create a new session inside    S � T T r   C r e a t e   a   n e w   t a b ,   w h i c h   w i l l   c r e a t e   a   n e w   s e s s i o n   i n s i d e Q  U V U r   ! ( W X W l  ! & Y���� Y I  ! &������
�� .Itrmntwnnull���     obj ��  ��  ��  ��   X o      ���� 0 newtab newTab V  Z [ Z l  ) )�� \ ]��   \ Q K Since we just created the tab, there should only be one session right now.    ] � ^ ^ �   S i n c e   w e   j u s t   c r e a t e d   t h e   t a b ,   t h e r e   s h o u l d   o n l y   b e   o n e   s e s s i o n   r i g h t   n o w . [  _�� _ O   ) � ` a ` X   - � b�� c b O   ? � d e d k   C � f f  g h g n  C K i j i I   D K�� k���� 0 waitforwindow waitForWindow k  l�� l m   D G m m � n n 
 i T e r m��  ��   j  f   C D h  o p o I  L _���� q
�� .Itrmsntxnull���     obj ��   q �� r��
�� 
Text r b   P [ s t s b   P Y u v u b   P U w x w m   P S y y � z z  s s h   x o   S T���� 0 username userName v m   U X { { � | |  @ t o   Y Z���� 0 agateway aGateway��   p  } ~ } l  ` `��������  ��  ��   ~   �  l  ` `�� � ���   � < 6 Wait for the password prompt, then enter the password    � � � � l   W a i t   f o r   t h e   p a s s w o r d   p r o m p t ,   t h e n   e n t e r   t h e   p a s s w o r d �  � � � r   ` t � � � n  ` p � � � I   a p�� ����� 0 waitforcount waitForCount �  � � � o   a b���� 0 logvar logVar �  � � � m   b e � � � � �  P a s s w o r d : �  � � � m   e f����  �  � � � m   f i � � � � � * A c c o u n t   l o c k e d   d u e   t o �  ��� � m   i j���� ��  ��   �  f   ` a � o      ���� 0 countsearch countSearch �  � � � l  u u�� � ���   � a [	set logVar to my logout(logVar, "count after waiting for password prompt: " & countSearch)    � � � � � 	 s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " c o u n t   a f t e r   w a i t i n g   f o r   p a s s w o r d   p r o m p t :   "   &   c o u n t S e a r c h ) �  � � � I  u ~���� �
�� .Itrmsntxnull���     obj ��   � �� ���
�� 
Text � o   y z���� 0 	apassword 	aPassword��   �  � � � l   ��������  ��  ��   �  � � � l   �� � ���   � 3 - Wait for the tokencode prompt, then enter it    � � � � Z   W a i t   f o r   t h e   t o k e n c o d e   p r o m p t ,   t h e n   e n t e r   i t �  � � � r    � � � � n   � � � � I   � ��� ����� 0 waitforcount waitForCount �  � � � o   � ����� 0 logvar logVar �  � � � m   � � � � � � �  P A S S C O D E : �  � � � m   � �����  �  � � � m   � � � � � � �  W r o n g   P a s s w o r d �  ��� � m   � ����� ��  ��   �  f    � � o      ���� 0 countsearch countSearch �  � � � l  � ��� � ���   � b \	set logVar to my logout(logVar, "count after waiting for tokencode prompt: " & countSearch)    � � � � � 	 s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " c o u n t   a f t e r   w a i t i n g   f o r   t o k e n c o d e   p r o m p t :   "   &   c o u n t S e a r c h ) �  � � � I  � ����� �
�� .Itrmsntxnull���     obj ��   � �� ���
�� 
Text � o   � ����� 0 
atokencode 
aTokenCode��   �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � 6 0 Wait for the shell prompt, then SSH to the node    � � � � `   W a i t   f o r   t h e   s h e l l   p r o m p t ,   t h e n   S S H   t o   t h e   n o d e �  � � � r   � � � � � n  � � � � � I   � ��� ����� 0 waitforcount waitForCount �  � � � o   � ����� 0 logvar logVar �  � � � m   � � � � � � � 8 v i e w   a v a i l a b l e   c o m m a n d s   t y p e �  � � � m   � �����  �  � � � m   � � � � � � �  P a s s w o r d : �  ��� � m   � ����� ��  ��   �  f   � � � o      ���� 0 countsearch countSearch �  � � � l  � ��� � ���   � ] Wset logVar to my logout(logVar, "count after waiting for shell prompt: " & countSearch)    � � � � � s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " c o u n t   a f t e r   w a i t i n g   f o r   s h e l l   p r o m p t :   "   &   c o u n t S e a r c h ) �  � � � I  � ����� �
�� .Itrmsntxnull���     obj ��   � �� ���
�� 
Text � b   � � � � � m   � � � � � � �  s s h   � o   � ����� 0 	autilnode 	aUtilNode��   �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � C = Wait for the second password prompt, then enter the password    � � � � z   W a i t   f o r   t h e   s e c o n d   p a s s w o r d   p r o m p t ,   t h e n   e n t e r   t h e   p a s s w o r d �  � � � l  � ��� � ���   � 5 / Note that the count we wait for this time is 2    � � � � ^   N o t e   t h a t   t h e   c o u n t   w e   w a i t   f o r   t h i s   t i m e   i s   2 �  � � � r   � � � � � n  � � � � � I   � ��� ����� 0 waitforcount waitForCount �    o   � ����� 0 logvar logVar  m   � � �  P a s s w o r d :  m   � �����  	 m   � �

 �  W r o n g   P a s s w o r d	 �� m   � ����� ��  ��   �  f   � � � o      ���� 0 countsearch countSearch �  l  � �����   b \set logVar to my logout(logVar, "count after waiting for password prompt 2: " & countSearch)    � � s e t   l o g V a r   t o   m y   l o g o u t ( l o g V a r ,   " c o u n t   a f t e r   w a i t i n g   f o r   p a s s w o r d   p r o m p t   2 :   "   &   c o u n t S e a r c h ) �� I  � �����
�� .Itrmsntxnull���     obj ��   ����
�� 
Text o   � ����� 0 	apassword 	aPassword��  ��   e o   ? @���� 0 asession aSession�� 0 asession aSession c 2  0 3��
�� 
Trms a o   ) *���� 0 newtab newTab��   N l   ���� 4   ��
�� 
cwin m    ���� ��  ��  ��   F m    �                                                                                  ITRM  alis    H  Macintosh HD               Ѻ�ZH+     �	iTerm.app                                                      s��|g�        ����  	                Applications    ѻ�      �|�:       �  $Macintosh HD:Applications: iTerm.app   	 i T e r m . a p p    M a c i n t o s h   H D  Applications/iTerm.app  / ��   D  l  � �����~��  �  �~    l  � ��}�}   ) #set logVar to logout(logVar, "END")    � F s e t   l o g V a r   t o   l o g o u t ( l o g V a r ,   " E N D " ) �| l  � ��{ !�{     	saveLog(logVar)   ! �""   	 s a v e L o g ( l o g V a r )�|    #$# l     �z�y�x�z  �y  �x  $ %&% i    '(' I      �w)�v�w 0 savelog saveLog) *�u* o      �t�t 0 logvar logVar�u  �v  ( I    	�s+�r
�s .sysoexecTEXT���     TEXT+ b     ,-, b     ./. m     00 �11  e c h o   "/ o    �q�q 0 logvar logVar- m    22 �33 & "   >   ~ / s c r i p t L o g . t x t�r  & 454 l     �p�o�n�p  �o  �n  5 676 i    898 I      �m:�l�m 
0 logout  : ;<; o      �k�k 0 logvar logVar< =�j= o      �i�i 0 thelog theLog�j  �l  9 k     
>> ?@? r     ABA b     CDC b     EFE o     �h�h 0 logvar logVarF m    GG �HH  
D o    �g�g 0 thelog theLogB o      �f�f 0 newlog newLog@ I�eI L    
JJ o    	�d�d 0 newlog newLog�e  7 KLK l     �c�b�a�c  �b  �a  L MNM i    OPO I      �`Q�_�` 0 waitforcount waitForCountQ RSR o      �^�^ 0 logvar logVarS TUT o      �]�] 0 searchstring searchStringU VWV o      �\�\ 0 desiredcount desiredCountW XYX o      �[�[ 0 abortstring abortStringY Z�ZZ o      �Y�Y  0 abortthreshold abortThreshold�Z  �_  P k     -[[ \]\ r     ^_^ n    	`a` I    	�Xb�W�X 0 grepcountsfor grepCountsForb cdc o    �V�V 0 logvar logVard efe o    �U�U 0 searchstring searchStringf ghg o    �T�T 0 abortstring abortStringh i�Si o    �R�R  0 abortthreshold abortThreshold�S  �W  a  f     _ o      �Q�Q 0 countsearch countSearch] jkj W    *lml k    %nn opo I   �Pq�O
�P .sysodelanull��� ��� nmbrq m    �N�N �O  p r�Mr r    %sts n   #uvu I    #�Lw�K�L 0 grepcountsfor grepCountsForw xyx o    �J�J 0 logvar logVary z{z o    �I�I 0 searchstring searchString{ |}| o    �H�H 0 abortstring abortString} ~�G~ o    �F�F  0 abortthreshold abortThreshold�G  �K  v  f    t o      �E�E 0 countsearch countSearch�M  m =    � o    �D�D 0 countsearch countSearch� o    �C�C 0 desiredcount desiredCountk ��B� L   + -�� o   + ,�A�A 0 countsearch countSearch�B  N ��� l     �@�?�>�@  �?  �>  � ��� i    ��� I      �=��<�= 0 grepcountsfor grepCountsFor� ��� o      �;�; 0 logvar logVar� ��� o      �:�: 0 searchstring searchString� ��� o      �9�9 0 abortstring abortString� ��8� o      �7�7  0 abortthreshold abortThreshold�8  �<  � k     ��� ��� r     ��� n    ��� I    �6�5�4�6 0 getcontents getContents�5  �4  �  f     � o      �3�3 $0 terminalcontents terminalContents� ��� l   �2�1�0�2  �1  �0  � ��� l   �/���/  � R LSquash the terminal contents down into one line so it can fit into a command   � ��� � S q u a s h   t h e   t e r m i n a l   c o n t e n t s   d o w n   i n t o   o n e   l i n e   s o   i t   c a n   f i t   i n t o   a   c o m m a n d� ��� r    ��� m    	�� ���  � o      �.�. 0 oneline  � ��� r    ��� n    ��� 2   �-
�- 
cpar� o    �,�, $0 terminalcontents terminalContents� o      �+�+ 0 
allrecords 
allRecords� ��� X    <��*�� Z   " 7���)�(� ?  " '��� n   " %��� 1   # %�'
�' 
leng� o   " #�&�& 0 arecord aRecord� m   % &�%�%  � k   * 3�� ��� r   * -��� o   * +�$�$ 0 arecord aRecord� o      �#�# 0 variable  � ��"� r   . 3��� b   . 1��� o   . /�!�! 0 oneline  � o   / 0� �  0 variable  � o      �� 0 oneline  �"  �)  �(  �* 0 arecord aRecord� o    �� 0 
allrecords 
allRecords� ��� l  = =����  �  �  � ��� l  = =����  � &   Check if abort threshold is met   � ��� @   C h e c k   i f   a b o r t   t h r e s h o l d   i s   m e t� ��� r   = H��� b   = F��� b   = D��� b   = B��� b   = @��� m   = >�� ���  e c h o   "� o   > ?�� 0 oneline  � m   @ A�� ���  "   |   g r e p   - o   "� o   B C�� 0 abortstring abortString� m   D E�� ���  "   |   w c   - l� o      �� (0 abortsearchcommand abortSearchCommand� ��� r   I P��� I  I N���
� .sysoexecTEXT���     TEXT� o   I J�� (0 abortsearchcommand abortSearchCommand�  � o      �� 0 
abortcount 
abortCount� ��� r   Q V��� c   Q T��� o   Q R�� 0 
abortcount 
abortCount� m   R S�
� 
nmbr� o      �� $0 abortcountnumber abortCountNumber� ��� Z   W n����� @   W Z��� o   W X�� $0 abortcountnumber abortCountNumber� o   X Y��  0 abortthreshold abortThreshold� k   ] j�� ��� I   ] c���
� 0 savelog saveLog� ��	� o   ^ _�� 0 logvar logVar�	  �
  � ��� R   d j���
� .ascrerr ****      � ****�  � ���
� 
errn� m   f g���'�  �  �  �  � ��� l  o o�� ���  �   ��  � ��� r   o ~��� b   o |��� b   o x��� b   o v��� b   o r��� m   o p�� �    e c h o   "� o   p q���� 0 oneline  � m   r u �  "   |   g r e p   - o   "� o   v w���� 0 searchstring searchString� m   x { �  "   |   w c   - l� o      ���� 0 command  �  r    � I   ���	��
�� .sysoexecTEXT���     TEXT	 o    ����� 0 command  ��   o      ���� 
0 counts   
��
 L   � � c   � � o   � ����� 
0 counts   m   � ���
�� 
nmbr��  �  l     ��������  ��  ��    i     I      �������� 0 getcontents getContents��  ��   k     &  l     ����   A ;iTerm needs to be in the front for key presses to register.    � v i T e r m   n e e d s   t o   b e   i n   t h e   f r o n t   f o r   k e y   p r e s s e s   t o   r e g i s t e r .  n     I    ������ 0 waitforwindow waitForWindow �� m       �!! 
 i T e r m��  ��    f      "#" l   ��$%��  $   Mush buttons in the app   % �&& 0   M u s h   b u t t o n s   i n   t h e   a p p# '(' O    #)*) k    "++ ,-, I   ��./
�� .prcskprsnull���     ctxt. m    00 �11  a/ ��2��
�� 
faal2 m    ��
�� eMdsKcmd��  - 343 I   ��56
�� .prcskprsnull���     ctxt5 m    77 �88  c6 ��9��
�� 
faal9 m    ��
�� eMdsKcmd��  4 :��: r    ";<; I    ��=��
�� .sysoexecTEXT���     TEXT= m    >> �??  p b p a s t e��  < o      ���� "0 sessioncontents sessionContents��  * m    @@�                                                                                  sevs  alis    �  Macintosh HD               Ѻ�ZH+     *System Events.app                                               �W�2�'        ����  	                CoreServices    ѻ�      �2�w       *        =Macintosh HD:System: Library: CoreServices: System Events.app   $  S y s t e m   E v e n t s . a p p    M a c i n t o s h   H D  -System/Library/CoreServices/System Events.app   / ��  ( A��A L   $ &BB o   $ %���� "0 sessioncontents sessionContents��   CDC l     ��������  ��  ��  D EFE l     ��GH��  G , & Waits for a window to come into focus   H �II L   W a i t s   f o r   a   w i n d o w   t o   c o m e   i n t o   f o c u sF J��J i    KLK I      ��M���� 0 waitforwindow waitForWindowM N��N o      ���� 0 appname appName��  ��  L k     9OO PQP l     ��RS��  R 0 * Poll until "appName" is the active window   S �TT T   P o l l   u n t i l   " a p p N a m e "   i s   t h e   a c t i v e   w i n d o wQ UVU r     WXW m     YY �ZZ 
 n o A p pX o      ���� 0 	activeapp 	activeAppV [��[ W    9\]\ k    4^^ _`_ r    aba l   c����c I   ��de
�� .earsffdralis        afdrd m    ��
�� appfegfpe ��f��
�� 
rtypf m    ��
�� 
utxt��  ��  ��  b o      ���� 0 	activeapp 	activeApp` ghg l   ��ij��  i ; 5 If the active app name does not contain the target,    j �kk j   I f   t h e   a c t i v e   a p p   n a m e   d o e s   n o t   c o n t a i n   t h e   t a r g e t ,  h lml l   ��no��  n    try to activate it again.   o �pp 4   t r y   t o   a c t i v a t e   i t   a g a i n .m qrq Z    .st��us H    vv E   wxw o    ���� 0 	activeapp 	activeAppx o    ���� 0 appname appNamet O    *yzy I  $ )������
�� .miscactvnull��� ��� null��  ��  z 4    !��{
�� 
capp{ o     ���� 0 appname appName��  u k   - .|| }~} l  - -�����     Done   � ��� 
   D o n e~ ����  S   - .��  r ���� I  / 4�����
�� .sysodelanull��� ��� nmbr� m   / 0�� ?���������  ��  ] =   ��� o    	���� 0 	activeapp 	activeApp� o   	 
���� 0 appname appName��  ��       �����������   A���������  � ����������������������������
�� .aevtoappnull  �   � ****�� 0 savelog saveLog�� 
0 logout  �� 0 waitforcount waitForCount�� 0 grepcountsfor grepCountsFor�� 0 getcontents getContents�� 0 waitforwindow waitForWindow�� 0 username userName�� 0 logvar logVar�� 	0 myvar  �� 0 newtab newTab�� 0 countsearch countSearch��  ��  � �� ��������
�� .aevtoappnull  �   � ****�� ����� �  ���������� 0 agateway aGateway�� 0 	autilnode 	aUtilNode�� 0 	apassword 	aPassword�� 0 
atokencode 
aTokenCode��  � ������������ 0 agateway aGateway�� 0 	autilnode 	aUtilNode�� 0 	apassword 	aPassword�� 0 
atokencode 
aTokenCode�� 0 asession aSession� " ����  �� A������������������ m���� y {�� � ������� � � � � �

�� .sysoexecTEXT���     TEXT�� 0 username userName�� 0 logvar logVar�� 	0 myvar  
�� .miscactvnull��� ��� null
�� 
cwin
�� .Itrmntwnnull���     obj �� 0 newtab newTab
�� 
Trms
�� 
kocl
�� 
cobj
�� .corecnte****       ****�� 0 waitforwindow waitForWindow
�� 
Text
�� .Itrmsntxnull���     obj �� �� 0 waitforcount waitForCount�� 0 countsearch countSearch�� ��j E�O�E�O�E�O� �*j O*�k/ �*j 
E�O� � �*�-[��l kh � �)a k+ O*a a �%a %�%l O)�a ka ka + E` O*a �l O)�a ka ka + E` O*a �l O)�a ka la + E` O*a a �%l O)�a  la !ka + E` O*a �l U[OY�YUUUOP� ��(���������� 0 savelog saveLog�� ����� �  �� 0 logvar logVar��  � �~�~ 0 logvar logVar� 02�}
�} .sysoexecTEXT���     TEXT�� 
�%�%j � �|9�{�z���y�| 
0 logout  �{ �x��x �  �w�v�w 0 logvar logVar�v 0 thelog theLog�z  � �u�t�s�u 0 logvar logVar�t 0 thelog theLog�s 0 newlog newLog� G�y ��%�%E�O�� �rP�q�p���o�r 0 waitforcount waitForCount�q �n��n �  �m�l�k�j�i�m 0 logvar logVar�l 0 searchstring searchString�k 0 desiredcount desiredCount�j 0 abortstring abortString�i  0 abortthreshold abortThreshold�p  � �h�g�f�e�d�c�h 0 logvar logVar�g 0 searchstring searchString�f 0 desiredcount desiredCount�e 0 abortstring abortString�d  0 abortthreshold abortThreshold�c 0 countsearch countSearch� �b�a�`�b �a 0 grepcountsfor grepCountsFor
�` .sysodelanull��� ��� nmbr�o .)�����+ E�O h�� kj O)�����+ E�[OY��O�� �_��^�]���\�_ 0 grepcountsfor grepCountsFor�^ �[��[ �  �Z�Y�X�W�Z 0 logvar logVar�Y 0 searchstring searchString�X 0 abortstring abortString�W  0 abortthreshold abortThreshold�]  � �V�U�T�S�R�Q�P�O�N�M�L�K�J�I�V 0 logvar logVar�U 0 searchstring searchString�T 0 abortstring abortString�S  0 abortthreshold abortThreshold�R $0 terminalcontents terminalContents�Q 0 oneline  �P 0 
allrecords 
allRecords�O 0 arecord aRecord�N 0 variable  �M (0 abortsearchcommand abortSearchCommand�L 0 
abortcount 
abortCount�K $0 abortcountnumber abortCountNumber�J 0 command  �I 
0 counts  � �H��G�F�E�D�C����B�A�@�?�>��H 0 getcontents getContents
�G 
cpar
�F 
kocl
�E 
cobj
�D .corecnte****       ****
�C 
leng
�B .sysoexecTEXT���     TEXT
�A 
nmbr�@ 0 savelog saveLog
�? 
errn�>�'�\ �)j+  E�O�E�O��-E�O )�[��l kh ��,j �E�O��%E�Y h[OY��O�%�%�%�%E�O�j 
E�O��&E�O�� *�k+ O)��lhY hO�%a %�%a %E�O�j 
E�O��&� �=�<�;���:�= 0 getcontents getContents�<  �;  � �9�9 "0 sessioncontents sessionContents� 
 �8@0�7�6�57>�4�8 0 waitforwindow waitForWindow
�7 
faal
�6 eMdsKcmd
�5 .prcskprsnull���     ctxt
�4 .sysoexecTEXT���     TEXT�: ')�k+ O� ���l O���l O�j 	E�UO�� �3L�2�1���0�3 0 waitforwindow waitForWindow�2 �/��/ �  �.�. 0 appname appName�1  � �-�,�- 0 appname appName�, 0 	activeapp 	activeApp� 	Y�+�*�)�(�'�&��%
�+ appfegfp
�* 
rtyp
�) 
utxt
�( .earsffdralis        afdr
�' 
capp
�& .miscactvnull��� ��� null
�% .sysodelanull��� ��� nmbr�0 :�E�O 4h�� ���l E�O�� *�/ *j UY O�j [OY��� ���  m c 0 2 3 2 1 9� �� ��$�#� �"��!
�" 
cwin� ���  w i n d o w - 1
�! kfrmID  
�$ 
Trmt�# �� ��  ��  ascr  ��ޭ