var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"feed","loadChildren":"./modules/feed/feed.module#FeedModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/feed/feed-routing.module.ts","module":"FeedRoutingModule","children":[{"path":"","component":"FeedComponent","children":[{"path":"cards","children":[{"path":"","component":"CardDetailsComponent"},{"path":":cid","component":"CardDetailsComponent","children":[{"path":"details/:did","component":"DetailComponent"}]}]}]}],"kind":"module"}],"module":"FeedModule"}]},{"path":"archives","loadChildren":"./modules/archives/archives.module#ArchivesModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/archives/archives-routing.module.ts","module":"ArchivesRoutingModule","children":[{"path":"","component":"ArchivesComponent"}],"kind":"module"}],"module":"ArchivesModule"}]},{"path":"navbar","component":"LoginComponent"},{"path":"**","redirectTo":"/feed"}],"kind":"module"}]}