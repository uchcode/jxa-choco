JsOsaDAS1.001.00bplist00�Vscripto.  ( ( g l o b a l ) = > { 
 
 O b j C . i m p o r t ( ' C o c o a ' ) 
 
 l e t   A p p l e t   =   A p p l i c a t i o n . c u r r e n t A p p l i c a t i o n ( ) 
 A p p l e t . i n c l u d e S t a n d a r d A d d i t i o n s   =   t r u e 
 
 g l o b a l . C h o c o   =   { } 
 
 f u n c t i o n   r e g i s t e r S u b c l a s s ( a r g v = { } )   { 
 	 l e t   m e t h o d s   =   { } 
 	 f o r   ( l e t   i   i n   a r g v . m e t h o d s )   { 
 	 	 i f   ( O b j e c t . p r o t o t y p e . t o S t r i n g . c a l l ( a r g v . m e t h o d s [ i ] ) . s l i c e ( 8 , - 1 ) . t o L o w e r C a s e ( )   = = =   ' f u n c t i o n ' )   { 
 	 	 	 i f   ( i   = = =   ' i n i t ' )   { 
 	 	 	 	 m e t h o d s [ i ]   =   a r g v . m e t h o d s [ i ] 
 	 	 	 }   e l s e   { 
 	 	 	 	 m e t h o d s [ i + ' : ' ]   =   { 
 	 	 	 	 	 t y p e s :   [ ' v o i d ' ,   [ ' i d ' ] ] , 
 	 	 	 	 	 i m p l e m e n t a t i o n :   a r g v . m e t h o d s [ i ] , 
 	 	 	 	 } 
 	 	 	 } 
 	 	 }   e l s e   { 
 	 	 	 m e t h o d s [ i ]   =   a r g v . m e t h o d s [ i ] 
 	 	 } 
 	 } 
 	 i f   ( ! m e t h o d s . i n i t )   m e t h o d s . i n i t   =   f u n c t i o n ( )   { 
 	 	 l e t   _ t h i s   =   O b j C . s u p e r ( t h i s ) . i n i t 
 	 	 i f   ( _ t h i s   ! =   u n d e f i n e d )   { 
 	 	 	 i f   ( _ t h i s . i n i t i a l i z e )   _ t h i s . i n i t i a l i z e ( $ ( ) ) 
 	 	 } 
 	 	 r e t u r n   _ t h i s 
 	 } 
 	 l e t   p a r a   =   { } 
 	 p a r a . n a m e   =   a r g v . n a m e 
 	 i f   ( a r g v . s u p e r c l a s s )   p a r a . s u p e r c l a s s   =   a r g v . s u p e r c l a s s 
 	 i f   ( a r g v . p r o t o c o l s )     p a r a . p r o t o c o l s     =   a r g v . p r o t o c o l s 
 	 i f   ( a r g v . p r o p e r t i e s )   p a r a . p r o p e r t i e s   =   a r g v . p r o p e r t i e s 
 	 p a r a . m e t h o d s   =   m e t h o d s 
 	 O b j C . r e g i s t e r S u b c l a s s ( p a r a ) 
 } 
 g l o b a l . C h o c o . r e g i s t e r S u b c l a s s   =   r e g i s t e r S u b c l a s s 
 
 f u n c t i o n   R e c t ( x ,   y ,   w ,   h )   { 
 	 r e t u r n   $ . N S M a k e R e c t ( x ,   y ,   w ,   h ) 
 } 
 g l o b a l . C h o c o . R e c t   =   R e c t 
 
 f u n c t i o n   U r l ( s t r )   { 
 	 r e t u r n   $ . N S U R L . U R L W i t h S t r i n g ( s t r ) 
 } 
 g l o b a l . C h o c o . U r l   =   U r l 
 
 f u n c t i o n   R e q ( u r l )   { 
 	 r e t u r n   $ . N S U R L R e q u e s t . r e q u e s t W i t h U R L ( u r l ) 
 } 
 g l o b a l . C h o c o . R e q   =   R e q 
 
 f u n c t i o n   S o u n d ( p a t h ,   f u n = ( ) = > { } )   { 
 	 l e t   s   =   $ . N S S o u n d . a l l o c . i n i t W i t h C o n t e n t s O f F i l e B y R e f e r e n c e ( p a t h ,   t r u e ) 
 	 f u n ( s ) 
 	 r e t u r n   s 
 } 
 g l o b a l . C h o c o . S o u n d   =   S o u n d 
 
 f u n c t i o n   B u t t o n ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   9 0 ,   2 6 ) 
 	 l e t   b   =   $ . N S B u t t o n . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 b . b e z e l S t y l e   =   $ . N S R o u n d e d B e z e l S t y l e 
 	 f u n ( b ) 
 	 r e t u r n   b 
 } 
 g l o b a l . C h o c o . B u t t o n   =   B u t t o n 
 
 f u n c t i o n   C h e c k B o x B u t t o n ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   2 6 ,   2 6 ) 
 	 l e t   b   =   $ . N S B u t t o n . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 b . b u t t o n T y p e   =   $ . N S S w i t c h B u t t o n 
 	 f u n ( b ) 
 	 r e t u r n   b 
 } 
 g l o b a l . C h o c o . C h e c k B o x B u t t o n   =   C h e c k B o x B u t t o n 
 
 f u n c t i o n   R a d i o B u t t o n ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   2 6 ,   2 6 ) 
 	 l e t   b   =   $ . N S B u t t o n . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 b . b u t t o n T y p e   =   $ . N S R a d i o B u t t o n 
 	 f u n ( b ) 
 	 r e t u r n   b 
 } 
 g l o b a l . C h o c o . R a d i o B u t t o n   =   R a d i o B u t t o n 
 
 f u n c t i o n   P o p U p B u t t o n ( f u n   =   ( ) = > { } )   { 
 	 l e t   p   =   $ . N S P o p U p B u t t o n . a l l o c . i n i t W i t h F r a m e ( $ . N S M a k e R e c t ( 0 ,   0 ,   9 0 ,   2 6 ) ) 
 	 f u n ( p ) 
 	 r e t u r n   p 
 } 
 g l o b a l . C h o c o . P o p U p B u t t o n   =   P o p U p B u t t o n 
 
 f u n c t i o n   T e x t F i e l d ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   2 0 0 ,   2 2 ) 
 	 l e t   t   =   $ . N S T e x t F i e l d . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 f u n ( t ) 
 	 r e t u r n   t 
 } 
 g l o b a l . C h o c o . T e x t F i e l d   =   T e x t F i e l d 
 
 f u n c t i o n   L a b e l ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   2 0 0 ,   2 2 ) 
 	 l e t   t   =   $ . N S T e x t F i e l d . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 t . d r a w s B a c k g r o u n d   =   f a l s e 
 	 t . b o r d e r e d   =   f a l s e 
 	 t . e d i t a b l e   =   f a l s e 
 	 t . s e l e c t a b l e   =   t r u e 
 	 f u n ( t ) 
 	 r e t u r n   t 
 } 
 g l o b a l . C h o c o . L a b e l   =   L a b e l 
 
 f u n c t i o n   R i g h t T e x t A l i g n m e n t ( )   { 
 	 r e t u r n   $ . N S R i g h t T e x t A l i g n m e n t 
 } 
 g l o b a l . C h o c o . R i g h t T e x t A l i g n m e n t   =   R i g h t T e x t A l i g n m e n t 
 
 f u n c t i o n   W r a p p i n g T e x t F i e l d ( f u n   =   ( ) = > { } )   { 
 	 r e g i s t e r C o n t r o l T e x t E d i t i n g D e l e g a t e S u b c l a s s ( ) 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   2 6 ,   2 6 ) 
 	 l e t   t   =   $ . N S T e x t F i e l d . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 t . d e l e g a t e   =   $ . C h o c o C o n t r o l T e x t E d i t i n g D e l e g a t e . a l l o c . i n i t 
 	 t . c e l l . w r a p s   =   t r u e 
 	 t . c e l l . l i n e B r e a k M o d e   =   $ . N S L i n e B r e a k B y W o r d W r a p p i n g 
 	 t . c e l l . u s e s S i n g l e L i n e M o d e   =   f a l s e 
 	 f u n ( t ) 
 	 r e t u r n   t 
 } 
 g l o b a l . C h o c o . W r a p p i n g T e x t F i e l d   =   W r a p p i n g T e x t F i e l d 
 
 f u n c t i o n   T e x t D a t e P i c k e r ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   2 6 ,   2 6 ) 
 	 l e t   p   =   $ . N S D a t e P i c k e r . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 p . d r a w s B a c k g r o u n d   =   t r u e 
 	 p . d a t e P i c k e r E l e m e n t s   =   $ . N S Y e a r M o n t h D a y D a t e P i c k e r E l e m e n t F l a g 
 	 p . d a t e P i c k e r S t y l e   =   $ . N S T e x t F i e l d A n d S t e p p e r D a t e P i c k e r S t y l e 
 	 p . d a t e V a l u e   =   $ . N S D a t e . d a t e 
 	 f u n ( p ) 
 	 r e t u r n   p 
 } 
 g l o b a l . C h o c o . T e x t D a t e P i c k e r   =   T e x t D a t e P i c k e r 
 
 f u n c t i o n   G r a p h i c a l D a t e P i c k e r ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   2 6 ,   2 6 ) 
 	 l e t   p   =   $ . N S D a t e P i c k e r . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 p . d r a w s B a c k g r o u n d   =   t r u e 
 	 p . d a t e P i c k e r E l e m e n t s   =   $ . N S Y e a r M o n t h D a y D a t e P i c k e r E l e m e n t F l a g 
 	 p . d a t e P i c k e r S t y l e   =   $ . N S C l o c k A n d C a l e n d a r D a t e P i c k e r S t y l e 
 	 p . d a t e V a l u e   =   $ . N S D a t e . d a t e 
 	 f u n ( p ) 
 	 r e t u r n   p 
 } 
 g l o b a l . C h o c o . G r a p h i c a l D a t e P i c k e r   =   G r a p h i c a l D a t e P i c k e r 
 
 f u n c t i o n   L i n e ( f u n   =   ( ) = > { } )   { 
 	 l e t   r   =   $ . N S M a k e R e c t ( 0 ,   0 ,   0 ,   0 ) 
 	 l e t   b   =   $ . N S B o x . a l l o c . i n i t W i t h F r a m e ( r ) 
 	 b . b o x T y p e   =   $ . N S B o x S e p a r a t o r 
 	 f u n ( b ) 
 	 r e t u r n   b 
 } 
 g l o b a l . C h o c o . L i n e   =   L i n e 
 
 f u n c t i o n   V i e w ( f u n   =   ( ) = > { } )   { 
 	 l e t   v   =   $ . N S V i e w . a l l o c . i n i t W i t h F r a m e ( $ . N S M a k e R e c t ( 0 ,   0 ,   0 ,   0 ) ) 
 	 f u n ( v ) 
 	 r e t u r n   v 
 } 
 g l o b a l . C h o c o . V i e w   =   V i e w 
 
 f u n c t i o n   W e b V i e w ( f u n   =   ( ) = > { } )   { 
 	 O b j C . i m p o r t ( ' W e b K i t ' ) 
 	 l e t   r   =   $ . N S Z e r o R e c t 
 	 l e t   c   =   $ . W K W e b V i e w C o n f i g u r a t i o n . a l l o c . i n i t 
 	 l e t   w   =   $ . W K W e b V i e w . a l l o c . i n i t W i t h F r a m e C o n f i g u r a t i o n ( r ,   c ) 
 	 f u n ( w ) 
 	 r e t u r n   w 
 } 
 g l o b a l . C h o c o . W e b V i e w   =   W e b V i e w 
 
 f u n c t i o n   M e n u ( f u n   =   ( ) = > { } )   { 
 	 l e t   m   =   $ . N S M e n u . a l l o c . i n i t 
 	 f u n ( m ) 
 	 r e t u r n   m 
 } 
 g l o b a l . C h o c o . M e n u   =   M e n u 
 
 f u n c t i o n   M e n u I t e m ( f u n   =   ( ) = > { } )   { 
 	 l e t   i   =   $ . N S M e n u I t e m . a l l o c . i n i t 
 	 f u n ( i ) 
 	 r e t u r n   i 
 } 
 g l o b a l . C h o c o . M e n u I t e m   =   M e n u I t e m 
 
 f u n c t i o n   M e n u S e p a r a t o r ( )   { 
 	 r e t u r n   $ . N S M e n u I t e m . s e p a r a t o r I t e m 
 } 
 g l o b a l . C h o c o . M e n u S e p a r a t o r   =   M e n u S e p a r a t o r 
 
 f u n c t i o n   S t a t u s I t e m ( f u n   =   ( ) = > { } )   { 
 	 l e t   i   =   $ . N S S t a t u s B a r . s y s t e m S t a t u s B a r . s t a t u s I t e m W i t h L e n g t h ( $ . N S V a r i a b l e S t a t u s I t e m L e n g t h ) 
 	 f u n ( i ) 
 	 r e t u r n   i 
 } 
 g l o b a l . C h o c o . S t a t u s I t e m   =   S t a t u s I t e m 
 
 f u n c t i o n   S t a t u s I t e m M e n u ( a r g v = { } )   { 
 	 l e t   n   =   ' C h o c o S t a t u s I t e m M e n u ' 
 	 r e g i s t e r S u b c l a s s ( { 
 	 	 n a m e :   n , 
 	 	 s u p e r c l a s s :   ' N S M e n u ' , 
 	 	 p r o p e r t i e s :   a r g v . p r o p e r t i e s , 
 	 	 m e t h o d s :   a r g v . m e t h o d s , 
 	 } ) 
 	 r e t u r n   $ [ n ] . a l l o c . i n i t 
 } 
 g l o b a l . C h o c o . S t a t u s I t e m M e n u   =   S t a t u s I t e m M e n u 
 
 f u n c t i o n   D o c k M e n u ( a r g v = { } )   { 
 	 l e t   n   =   ' C h o c o D o c k M e n u ' 
 	 r e g i s t e r S u b c l a s s ( { 
 	 	 n a m e :   n , 
 	 	 s u p e r c l a s s :   ' N S M e n u ' , 
 	 	 p r o p e r t i e s :   a r g v . p r o p e r t i e s , 
 	 	 m e t h o d s :   a r g v . m e t h o d s , 
 	 } ) 
 	 r e t u r n   $ [ n ] . a l l o c . i n i t 
 } 
 g l o b a l . C h o c o . D o c k M e n u   =   D o c k M e n u 
 
 f u n c t i o n   P a t h 2 ( s t r )   { 
 	 r e t u r n   P a t h ( $ ( s t r ) . s t r i n g B y S t a n d a r d i z i n g P a t h . j s ) 
 } 
 g l o b a l . C h o c o . P a t h 2   =   P a t h 2 
 
 f u n c t i o n   P a t h T o R e s o u r c e ( r e s o u r c e N a m e = ' ' )   { 
 	 i f   ( r e s o u r c e N a m e )   { 
 	 	 r e t u r n   P a t h ( $ . N S B u n d l e . m a i n B u n d l e . r e s o u r c e P a t h . j s + ' / ' + r e s o u r c e N a m e ) 
 	 }   e l s e   { 
 	 	 r e t u r n   P a t h ( $ . N S B u n d l e . m a i n B u n d l e . r e s o u r c e P a t h . j s ) 
 	 } 
 } 
 g l o b a l . C h o c o . P a t h T o R e s o u r c e   =   P a t h T o R e s o u r c e 
 
 f u n c t i o n   P a t h T o M e ( )   { 
 	 r e t u r n   P a t h 2 ( $ . N S B u n d l e . m a i n B u n d l e . r e s o u r c e P a t h . j s + ' / . . / . . / ' ) 
 } 
 g l o b a l . C h o c o . P a t h T o M e   =   P a t h T o M e 
 
 f u n c t i o n   r e g i s t e r W i n d o w D e l e g a t e S u b c l a s s ( )   { 
 	 i f   ( ! $ . C h o c o W i n d o w D e l e g a t e )   O b j C . r e g i s t e r S u b c l a s s ( { 
 	 	 n a m e : ' C h o c o W i n d o w D e l e g a t e ' , 
 	 	 p r o t o c o l s :   [ ' N S W i n d o w D e l e g a t e ' ] , 
 	 	 m e t h o d s :   { 
 	 	 	 ' w i n d o w W i l l C l o s e : ' ( n o t i f i c a t i o n )   { 
 	 	 	 	 $ . N S A p p l i c a t i o n . s h a r e d A p p l i c a t i o n . t e r m i n a t e ( $ ( ) ) 
 	 	 	 } 
 	 	 } 
 	 } ) 
 } 
 g l o b a l . C h o c o . r e g i s t e r W i n d o w D e l e g a t e S u b c l a s s   =   r e g i s t e r W i n d o w D e l e g a t e S u b c l a s s 
 
 f u n c t i o n   r e g i s t e r C o n t r o l T e x t E d i t i n g D e l e g a t e S u b c l a s s ( )   { 
 	 i f   ( ! $ . C h o c o C o n t r o l T e x t E d i t i n g D e l e g a t e )   O b j C . r e g i s t e r S u b c l a s s ( { 
 	 	 n a m e :   ' C h o c o C o n t r o l T e x t E d i t i n g D e l e g a t e ' , 
 	 	 p r o t o c o l s :   [ ' N S C o n t r o l T e x t E d i t i n g D e l e g a t e ' ] , 
 	 	 m e t h o d s :   { 
 	 	 	 ' c o n t r o l : t e x t V i e w : d o C o m m a n d B y S e l e c t o r : ' :   f u n c t i o n ( c o n t r o l ,   t e x t V i e w ,   c o m m a n d S e l e c t o r )   { 
 	 	 	 	 l e t   r e s u l t   =   f a l s e 
 	 	 	 	 i f   ( c o m m a n d S e l e c t o r   = =   ' i n s e r t N e w l i n e : ' )   { 
 	 	 	 	 	 t e x t V i e w . i n s e r t N e w l i n e I g n o r i n g F i e l d E d i t o r ( t h i s ) 
 	 	 	 	 	 r e t u r n   t r u e 
 	 	 	 	 } 
 	 	 	 	 i f   ( c o m m a n d S e l e c t o r   = =   ' i n s e r t T a b : ' )   { 
 	 	 	 	 	 t e x t V i e w . i n s e r t T a b I g n o r i n g F i e l d E d i t o r ( t h i s ) 
 	 	 	 	 	 r e t u r n   t r u e 
 	 	 	 	 } 
 	 	 	 	 r e t u r n   r e s u l t 
 	 	 	 } , 
 	 	 } , 
 	 } ) 
 } 
 g l o b a l . C h o c o . r e g i s t e r C o n t r o l T e x t E d i t i n g D e l e g a t e S u b c l a s s   =   r e g i s t e r C o n t r o l T e x t E d i t i n g D e l e g a t e S u b c l a s s 
 
 f u n c t i o n   r e g i s t e r U t i l i t y W i n d o w S u b c l a s s ( a r g v = { } )   { 
 	 r e g i s t e r W i n d o w D e l e g a t e S u b c l a s s ( ) 
 	 i f   ( ! a r g v . m e t h o d s )   a r g v . m e t h o d s   =   { } 
 	 i f   ( ! a r g v . m e t h o d s . i n i t )   a r g v . m e t h o d s . i n i t   =   f u n c t i o n ( )   { 
 	 	 l e t   _ t h i s   =   O b j C . s u p e r ( t h i s ) . i n i t W i t h C o n t e n t R e c t S t y l e M a s k B a c k i n g D e f e r ( 
 	 	 	 $ . N S M a k e R e c t ( 2 0 0 ,   2 4 0 ,   4 8 0 ,   2 7 0 ) , 
 	 	 	 $ . N S T i t l e d W i n d o w M a s k   |   $ . N S C l o s a b l e W i n d o w M a s k   |   $ . N S M i n i a t u r i z a b l e W i n d o w M a s k , 
 	 	 	 $ . N S B a c k i n g S t o r e B u f f e r e d , 
 	 	 	 f a l s e 
 	 	 ) 
 	 	 i f   ( _ t h i s   ! =   u n d e f i n e d )   { 
 	 	 	 _ t h i s . i d e n t i f i e r   =   ' A p p W i n d o w ' 
 	 	 	 _ t h i s . o n e S h o t   =   t r u e 
 	 	 	 _ t h i s . d e l e g a t e   =   $ . C h o c o W i n d o w D e l e g a t e . a l l o c . i n i t 
 	 	 	 i f   ( _ t h i s . i n i t i a l i z e )   _ t h i s . i n i t i a l i z e ( $ ( ) ) 
 	 	 } 
 	 	 r e t u r n   _ t h i s 
 	 } 
 	 i f   ( ! a r g v . m e t h o d s [ ' s e t F r a m e : ' ] )   a r g v . m e t h o d s [ ' s e t F r a m e : ' ]   =   { 
 	 	 t y p e s :   [ ' v o i d ' ,   [ ' N S R e c t ' ] ] , 
 	 	 i m p l e m e n t a t i o n :   f u n c t i o n ( r e c t )   { 
 	 	 	 t h i s . s e t F r a m e D i s p l a y A n i m a t e ( r e c t ,   t r u e ,   t r u e ) 
 	 	 } 
 	 } 
 	 r e g i s t e r S u b c l a s s ( { 
 	 	 n a m e :   a r g v . n a m e , 
 	 	 s u p e r c l a s s :   ' N S W i n d o w ' , 
 	 	 p r o t o c o l s :   a r g v . p r o t o c o l s , 
 	 	 p r o p e r t i e s :   a r g v . p r o p e r t i e s , 
 	 	 m e t h o d s :   a r g v . m e t h o d s , 
 	 } ) 
 } 
 g l o b a l . C h o c o . r e g i s t e r U t i l i t y W i n d o w S u b c l a s s   =   r e g i s t e r U t i l i t y W i n d o w S u b c l a s s 
 
 f u n c t i o n   r e g i s t e r S h o e b o x W i n d o w S u b c l a s s ( a r g v = { } )   { 
 	 i f   ( ! a r g v . m e t h o d s )   a r g v . m e t h o d s   =   { } 
 	 i f   ( ! a r g v . m e t h o d s . i n i t )   a r g v . m e t h o d s . i n i t   =   f u n c t i o n ( )   { 
 	 	 l e t   _ t h i s   =   O b j C . s u p e r ( t h i s ) . i n i t W i t h C o n t e n t R e c t S t y l e M a s k B a c k i n g D e f e r ( 
 	 	 	 $ . N S M a k e R e c t ( 2 0 0 ,   2 4 0 ,   4 8 0 ,   2 7 0 ) , 
 	 	 	 $ . N S T i t l e d W i n d o w M a s k   |   $ . N S C l o s a b l e W i n d o w M a s k   |   $ . N S M i n i a t u r i z a b l e W i n d o w M a s k , 
 	 	 	 $ . N S B a c k i n g S t o r e B u f f e r e d , 
 	 	 	 f a l s e 
 	 	 ) 
 	 	 i f   ( _ t h i s   ! =   u n d e f i n e d )   { 
 	 	 	 _ t h i s . i d e n t i f i e r   =   ' A p p W i n d o w ' 
 	 	 	 _ t h i s . o n e S h o t   =   t r u e 
 	 	 	 _ t h i s . r e l e a s e d W h e n C l o s e d   =   f a l s e 
 	 	 	 i f   ( _ t h i s . i n i t i a l i z e )   _ t h i s . i n i t i a l i z e ( $ ( ) ) 
 	 	 } 
 	 	 r e t u r n   _ t h i s 
 	 } 
 	 i f   ( ! a r g v . m e t h o d s [ ' s e t F r a m e : ' ] )   a r g v . m e t h o d s [ ' s e t F r a m e : ' ]   =   { 
 	 	 t y p e s :   [ ' v o i d ' ,   [ ' N S R e c t ' ] ] , 
 	 	 i m p l e m e n t a t i o n :   f u n c t i o n ( r e c t )   { 
 	 	 	 t h i s . s e t F r a m e D i s p l a y A n i m a t e ( r e c t ,   t r u e ,   t r u e ) 
 	 	 } 
 	 } 
 	 r e g i s t e r S u b c l a s s ( { 
 	 	 n a m e :   a r g v . n a m e , 
 	 	 s u p e r c l a s s :   ' N S W i n d o w ' , 
 	 	 p r o t o c o l s :   a r g v . p r o t o c o l s , 
 	 	 p r o p e r t i e s :   a r g v . p r o p e r t i e s , 
 	 	 m e t h o d s :   a r g v . m e t h o d s , 
 	 } ) 
 } 
 g l o b a l . C h o c o . r e g i s t e r S h o e b o x W i n d o w S u b c l a s s   =   r e g i s t e r S h o e b o x W i n d o w S u b c l a s s 
 
 f u n c t i o n   d o S h e l l ( s c r i p t ,   o p t = { } )   { 
 	 r e t u r n   A p p l e t . d o S h e l l S c r i p t ( s c r i p t ,   { 
 	 	 a d m i n i s t r a t o r P r i v i l e g e s :   ! ! o p t . w i t h P r o m p t , 
 	 	 w i t h P r o m p t :   o p t . w i t h P r o m p t   ?   o p t . w i t h P r o m p t   :   ' ' , 
 	 	 a l t e r i n g L i n e E n d i n g s :   o p t . a l t e r i n g L i n e E n d i n g s   ?   o p t . a l t e r i n g L i n e E n d i n g s   :   f a l s e 
 	 } ) . t r i m ( ) 
 } 
 g l o b a l . C h o c o . d o S h e l l   =   d o S h e l l 
 
 f u n c t i o n   g l o b a l i z e ( s c o p e )   { 
 	 i f   ( s c o p e [ ' g l o b a l i z e ' ] )   t h r o w   ` g l o b a l i z e   i s   e x i s t ,   a b o r t . ` 
 	 O b j e c t . k e y s ( g l o b a l . C h o c o ) . f o r E a c h (   i   = >   { 
 	 	 i f   ( i   = = =   ' g l o b a l i z e ' )   r e t u r n 
 	 	 i f   ( s c o p e [ i ] )   t h r o w   ` $ { i }   i s   e x i s t ,   a b o r t . ` 
 	 	 s c o p e [ i ]   =   g l o b a l . C h o c o [ i ] 
 	 } ) 
 } 
 g l o b a l . C h o c o . g l o b a l i z e   =   g l o b a l i z e 
 
 } ) ( t h i s ) ; 
 
 / / = = = = = = = = = = = = = = = = = = = = = 
 
 O b j C . i m p o r t ( ' C o c o a ' ) 
 
 A p p l e t   =   A p p l i c a t i o n . c u r r e n t A p p l i c a t i o n ( ) 
 A p p l e t . i n c l u d e S t a n d a r d A d d i t i o n s   =   t r u e 
 
 c o n s t   H O M E _ U R L   =   ' h t t p s : / / w w w . y o u t u b e . c o m ' 
 
 C h o c o . r e g i s t e r S h o e b o x W i n d o w S u b c l a s s ( { 
 	 n a m e :   ' W e b V i e w W i n d o w ' , 
 	 p r o p e r t i e s :   { 
 	 } , 
 	 m e t h o d s :   { 
 	 	 i n i t i a l i z e ( )   { 
 	 	 	 t h i s . t i t l e   =   ' Y o u T u b e ' 
 	 	 	 t h i s . s t y l e M a s k   | =   $ . N S R e s i z a b l e W i n d o w M a s k 
 	 	 	 t h i s . s e t F r a m e A u t o s a v e N a m e ( ' W e b V i e w W i n d o w ' ) 
 	 	 	 t h i s . c o n t e n t V i e w   =   C h o c o . W e b V i e w (   c   = >   { 
 	 	 	 	 l e t   u   =   $ . N S U s e r D e f a u l t s . s t a n d a r d U s e r D e f a u l t s . s t r i n g F o r K e y ( ' u r l ' ) . j s 
 	 	 	 	 l e t   a   =   u   ?   u   :   H O M E _ U R L 
 	 	 	 	 c . l o a d R e q u e s t ( C h o c o . R e q ( C h o c o . U r l ( a ) ) ) 
 	 	 	 } ) 
 	 	 } , 
 	 } , 
 } ) 
 
 _   =   C h o c o . S t a t u s I t e m (   c   = >   { 
 	 c . t i t l e   =   '�=�� ' 
 	 c . m e n u   =   C h o c o . S t a t u s I t e m M e n u ( { 
 	 	 p r o p e r t i e s :   { 
 	 	 	 w i n d o w :   ' i d ' , 
 	 	 } , 
 	 	 m e t h o d s :   { 
 	 	 	 i n i t i a l i z e ( )   { 
 	 	 	 	 t h i s . a d d I t e m (   C h o c o . M e n u I t e m (   c   = >   { 
 	 	 	 	 	 c . t i t l e   =   ' S h o w   W i n d o w ' 
 	 	 	 	 	 c . t a r g e t   =   t h i s 
 	 	 	 	 	 c . a c t i o n   =   ' s h o w W i n d o w : ' 
 	 	 	 	 } ) ) 
 	 	 	 	 t h i s . a d d I t e m (   C h o c o . M e n u S e p a r a t o r ( )   ) 
 	 	 	 	 t h i s . a d d I t e m (   C h o c o . M e n u I t e m (   c   = >   { 
 	 	 	 	 	 c . t i t l e   =   ' H o m e ' 
 	 	 	 	 	 c . t a r g e t   =   t h i s 
 	 	 	 	 	 c . a c t i o n   =   ' h o m e : ' 
 	 	 	 	 } ) ) 
 	 	 	 	 t h i s . a d d I t e m (   C h o c o . M e n u I t e m (   c   = >   { 
 	 	 	 	 	 c . t i t l e   =   ' R e l o a d ' 
 	 	 	 	 	 c . t a r g e t   =   t h i s 
 	 	 	 	 	 c . a c t i o n   =   ' r e l o a d : ' 
 	 	 	 	 } ) ) 
 	 	 	 	 t h i s . a d d I t e m (   C h o c o . M e n u I t e m (   c   = >   { 
 	 	 	 	 	 c . t i t l e   =   ' E d i t ' 
 	 	 	 	 	 c . t a r g e t   =   t h i s 
 	 	 	 	 	 c . a c t i o n   =   ' e d i t : ' 
 	 	 	 	 } ) ) 
 	 	 	 	 t h i s . a d d I t e m (   C h o c o . M e n u S e p a r a t o r ( )   ) 
 	 	 	 	 t h i s . a d d I t e m (   C h o c o . M e n u I t e m (   c   = >   { 
 	 	 	 	 	 c . t i t l e   =   ' Q u i t ' 
 	 	 	 	 	 c . t a r g e t   =   t h i s 
 	 	 	 	 	 c . a c t i o n   =   ' q u i t : ' 
 	 	 	 	 } ) ) 
 	 	 	 	 t h i s . w i n d o w   =   $ . W e b V i e w W i n d o w . a l l o c . i n i t 
 	 	 	 	 t h i s . s h o w W i n d o w ( $ ( t h i s ) ) 
 	 	 	 } , 
 	 	 	 s h o w W i n d o w ( s e n d e r )   { 
 	 	 	 	 A p p l e t . a c t i v a t e ( ) 
 	 	 	 	 t h i s . w i n d o w . m a k e K e y A n d O r d e r F r o n t ( t h i s . w i n d o w ) 
 	 	 	 } , 
 	 	 	 h o m e ( s e n d e r )   { 
 	 	 	 	 t h i s . w i n d o w . c o n t e n t V i e w . l o a d R e q u e s t ( C h o c o . R e q ( C h o c o . U r l ( H O M E _ U R L ) ) ) 
 	 	 	 	 t h i s . s h o w W i n d o w ( s e n d e r ) 
 	 	 	 } , 
 	 	 	 r e l o a d ( s e n d e r )   { 
 	 	 	 	 t h i s . w i n d o w . c o n t e n t V i e w . r e l o a d F r o m O r i g i n 
 	 	 	 	 t h i s . s h o w W i n d o w ( s e n d e r ) 
 	 	 	 } , 
 	 	 	 e d i t ( s e n d e r )   { 
 	 	 	 	 l e t   p   =   C h o c o . P a t h T o M e ( ) 
 	 	 	 	 C h o c o . d o S h e l l ( ` o p e n   - a   " S c r i p t   E d i t o r "   " $ { p } " ` ) 
 	 	 	 	 t h i s . q u i t ( s e n d e r ) 
 	 	 	 } , 
 	 	 	 q u i t ( s e n d e r )   { 
 	 	 	 	 l e t   u   =   t h i s . w i n d o w . c o n t e n t V i e w . U R L . a b s o l u t e S t r i n g 
 	 	 	 	 $ . N S U s e r D e f a u l t s . s t a n d a r d U s e r D e f a u l t s . s e t O b j e c t F o r K e y ( u , ' u r l ' ) 
 	 	 	 	 $ . N S A p p . t e r m i n a t e ( s e n d e r ) 
 	 	 	 } , 
 	 	 } , 
 	 } ) 
 } ) 
                              \Vjscr  ��ޭ