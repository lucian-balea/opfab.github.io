window.swaggerSpec={
  "swagger" : "2.0",
  "info" : {
    "description" : "OperatorFabric Card Consumer Service",
    "version" : "1.2.0.SNAPSHOT",
    "title" : "Card Management API",
    "termsOfService" : "",
    "contact" : {
      "email" : "opfab_AT_lists.lfenergy.org",
      "url" : "https://opfab.github.io/"
    },
    "license" : {
      "name" : "Mozilla Public License V2.0",
      "url" : "http://mozilla.org/MPL/2.0/"
    }
  },
  "host" : "localhost",
  "basePath" : "/apis",
  "tags" : [ {
    "name" : "cards",
    "description" : "Everything concerning cards"
  }, {
    "name" : "actions",
    "description" : "Everything concerning actions"
  }, {
    "name" : "read",
    "description" : "Everything concerning resource state"
  }, {
    "name" : "creation",
    "description" : "Everything concerning resource creation"
  }, {
    "name" : "deletion",
    "description" : "Everything concerning resource deletion"
  }, {
    "name" : "archives",
    "description" : "Everything concerning archived cards"
  } ],
  "schemes" : [ "http" ],
  "definitions" : {
    "EpochDate" : {
      "type" : "object",
      "description" : "Number of milliseconds since Epoch (long integer)",
      "example" : 1551868290379
    },
    "LongInteger" : {
      "type" : "object",
      "description" : "Number of items",
      "example" : 10
    },
    "TimeSpanDisplayModeEnum" : {
      "type" : "string",
      "description" : "Time span disply mode >\n* BUBBLE: Only displays Time span start\n* LINE: displays start and end with a junction line",
      "enum" : [ "BUBBLE", "LINE" ]
    },
    "CardOperationTypeEnum" : {
      "type" : "string",
      "description" : "Type of operation >\n* ADD - Operation lists cards object to be added\n* UPDATE - Operation lists cards object to be updated\n* DELETE - Operation lists card ids to be deleted",
      "enum" : [ "ADD", "UPDATE", "DELETE" ],
      "example" : "ADD"
    },
    "SeverityEnum" : {
      "type" : "string",
      "description" : "Severity of the card subject >\n* ALARM - The process instance behind the card is in critical condition\n* ACTION - The process instance behind the card is expecting an action from the user\n* COMPLIANT - The process related to the card is in a compliant status\n* INFORMATION - Purely informational card",
      "enum" : [ "ALARM", "ACTION", "COMPLIANT", "INFORMATION" ],
      "example" : "INFORMATION"
    },
    "ActionEnum" : {
      "type" : "string",
      "description" : "Action type >\n* EXTERNAL - Not defined (not implemented)\n* URL - The action is tied to a url which must conform the specification of 3rd Party actions (see reference manual)\n* JNLP - The action triggers a JNLP link (not implemented)",
      "enum" : [ "EXTERNAL", "URL", "JNLP" ],
      "example" : "URL"
    },
    "TitlePositionEnum" : {
      "type" : "string",
      "description" : "Possible title positions >\n* UP - At the top of the detail\n* DOWN - At the bottom of the detail\n* NONE - Not displayed",
      "enum" : [ "UP", "DOWN", "NONE" ],
      "example" : "UP"
    },
    "RecipientEnum" : {
      "type" : "string",
      "description" : "Recipient type >\n* DEADEND - Card is sent to no one (mostly for testing purposes)\n* GROUP - Card is sent to every user belonging to a group (identity)\n* USER - Card is sent to a single user (identity)\n* UNION - Card is sent to users according to the union of a recipient list  (recipients)",
      "enum" : [ "DEADEND", "GROUP", "USER", "UNION" ],
      "example" : "GROUP"
    },
    "I18n" : {
      "type" : "object",
      "description" : "describes an i18n label",
      "properties" : {
        "key" : {
          "type" : "string",
          "description" : "i18n client side key"
        },
        "parameters" : {
          "type" : "object",
          "description" : "Optional parameters",
          "additionalProperties" : {
            "type" : "string"
          }
        }
      },
      "required" : [ "key" ],
      "example" : {
        "key" : "title",
        "parameters" : {
          "EN" : "My Title",
          "FR" : "Mon Titre"
        }
      }
    },
    "CardCreationReport" : {
      "type" : "object",
      "properties" : {
        "count" : {
          "type" : "integer",
          "description" : "Number of created cards"
        },
        "message" : {
          "type" : "string"
        }
      },
      "required" : [ "count", "message" ],
      "example" : {
        "count" : 10,
        "message" : "Cards successfully created."
      }
    },
    "CardOperation" : {
      "type" : "object",
      "description" : "This object holds an operation to be performed as well as a collection of cards (published in the same second) so as to be able to perform the operation on a batch of cards rather than on a single card.",
      "properties" : {
        "number" : {
          "$ref" : "#/definitions/LongInteger"
        },
        "publishDate" : {
          "$ref" : "#/definitions/EpochDate"
        },
        "type" : {
          "$ref" : "#/definitions/CardOperationTypeEnum"
        },
        "cardIds" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "description" : "IDs of cards to be deleted. Only used for CardOperations of DELETE type."
        },
        "cards" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/LightCard"
          },
          "description" : "Card objects to be added or updated. Only used for CardOperations of ADD or UPDATE type."
        }
      },
      "example" : {
        "number" : 3,
        "publishDate" : 1546300800000,
        "type" : "DELETE",
        "cardIds" : [ 12345, 12346, 12347 ]
      }
    },
    "Detail" : {
      "description" : "detail defines html data rendering",
      "type" : "object",
      "properties" : {
        "title" : {
          "description" : "Card i18n title",
          "$ref" : "#/definitions/I18n"
        },
        "titleStyle" : {
          "description" : "css classes applied to title",
          "type" : "string"
        },
        "titlePosition" : {
          "description" : "Title position",
          "$ref" : "#/definitions/TitlePositionEnum"
        },
        "templateName" : {
          "description" : "template unique name as defined by Third Party Bundle in Third Party Service",
          "type" : "string"
        },
        "styles" : {
          "description" : "css files names to load as defined by Third Party Bundle in Third Party Service",
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        }
      },
      "required" : [ "title", "templateName" ],
      "example" : {
        "title" : {
          "key" : "myCard.title",
          "parameters" : {
            "EN" : "My card title",
            "FR" : "Mon titre de carte"
          },
          "titlePosition" : "UP",
          "titleStyle" : "myTitleStyle.css",
          "templateName" : "template1",
          "styles" : [ "bundleTest.css", "otherStyle.css" ]
        }
      }
    },
    "Recipient" : {
      "description" : "Recipient object defines rules for recipient computation",
      "type" : "object",
      "properties" : {
        "type" : {
          "$ref" : "#/definitions/RecipientEnum",
          "description" : "Specifies the recipient type. Please note that DEADEND do not expose any other properties"
        },
        "recipients" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/Recipient"
          },
          "description" : "Used by UNION with multiple Recipients."
        },
        "identity" : {
          "type" : "string",
          "description" : "Used by USER, GROUP"
        }
      },
      "required" : [ "type" ],
      "example" : {
        "type" : "UNION",
        "recipients" : [ {
          "type" : "GROUP",
          "identity" : "myGroupA"
        }, {
          "type" : "GROUP",
          "identity" : "myGroupB"
        }, {
          "type" : "USER",
          "identity" : "aGivenUser"
        } ]
      }
    },
    "TimeSpan" : {
      "type" : "object",
      "description" : "An object to define a business time span",
      "properties" : {
        "start" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Span start"
        },
        "end" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Span end (must be after start)"
        },
        "display" : {
          "$ref" : "#/definitions/TimeSpanDisplayModeEnum",
          "description" : "defaults to BUBBLE if only start is set and to LINE if start and end are set"
        }
      },
      "required" : [ "start" ]
    },
    "Card" : {
      "type" : "object",
      "description" : "A Card sums up information about the status of a given process instance of the publishing service",
      "properties" : {
        "uid" : {
          "type" : "string",
          "description" : "Unique card ID",
          "readOnly" : true
        },
        "id" : {
          "type" : "string",
          "description" : "Unique card ID (as defined in the associated process)",
          "readOnly" : true
        },
        "publisher" : {
          "type" : "string",
          "description" : "Publishing service unique ID"
        },
        "publisherVersion" : {
          "type" : "string",
          "description" : "Publishing service version"
        },
        "process" : {
          "type" : "string",
          "description" : "associated process name"
        },
        "processId" : {
          "type" : "string",
          "description" : "Unique process ID of the associated process instance"
        },
        "state" : {
          "type" : "string",
          "description" : "associated process state name"
        },
        "publishDate" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "The date the card was published (meaning created by the card service)",
          "readOnly" : true
        },
        "deletionDate" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "The date the card was deleted",
          "readOnly" : true
        },
        "lttd" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Last time to decide, after this date no action can be triggered on the card"
        },
        "startDate" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Card validity start time"
        },
        "endDate" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Card validity end time (must be after startDate)"
        },
        "severity" : {
          "$ref" : "#/definitions/SeverityEnum",
          "description" : "Card severity"
        },
        "tags" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "description" : "Tags associated with the card"
        },
        "timeSpans" : {
          "type" : "array",
          "description" : "List of business time span associated to card",
          "items" : {
            "$ref" : "#/definitions/TimeSpan"
          }
        },
        "details" : {
          "type" : "array",
          "description" : "List of card associated details",
          "items" : {
            "$ref" : "#/definitions/Detail"
          }
        },
        "title" : {
          "description" : "Card i18n title",
          "$ref" : "#/definitions/I18n"
        },
        "summary" : {
          "description" : "Card i18n summary",
          "$ref" : "#/definitions/I18n"
        },
        "recipient" : {
          "description" : "Recipient computation rule",
          "$ref" : "#/definitions/Recipient"
        },
        "userRecipients" : {
          "description" : "Complete list of user recipients at computation time",
          "readOnly" : true,
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        },
        "groupRecipients" : {
          "description" : "Complete list of group recipients at computation time",
          "readOnly" : true,
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        },
        "entityRecipients" : {
          "description" : "List of entity recipients",
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "example" : [ "tso1", "tso2" ]
        },
        "data" : {
          "type" : "object",
          "description" : "Business data"
        }
      },
      "required" : [ "processId", "publisher", "publisherVersion", "severity", "startDate", "title", "summary", "recipient" ],
      "example" : {
        "uid" : 12345,
        "id" : "cardIdFromMyProcess",
        "publisher" : "MyService",
        "publisherVersion" : "0.0.1",
        "process" : "MyProcess",
        "processId" : "MyProcess_001",
        "state" : "started",
        "publishDate" : 1546300800000,
        "deletionDate" : 1546388200000,
        "lttd" : 1546387230000,
        "startDate" : 1546387200000,
        "endDate" : 1546387250000,
        "severity" : "ACTION",
        "tags" : [ "MyService", "MyProcess", "ACTION" ],
        "actions" : [ {
          "type" : "URL",
          "lockAction" : true,
          "called" : false,
          "updateStateBeforeAction" : false,
          "hidden" : true,
          "buttonStyle" : "button.css",
          "label" : {
            "key" : "myCard.myAction.label",
            "parameters" : {
              "EN" : "My actions label",
              "FR" : "Mon intitule d'actions"
            }
          }
        } ],
        "details" : {
          "title" : {
            "key" : "myCard.title",
            "parameters" : {
              "EN" : "My card title",
              "FR" : "Mon titre de carte"
            }
          },
          "titlePosition" : "UP",
          "titleStyle" : "myTitleStyle.css",
          "templateName" : "template1",
          "styles" : [ "bundleTest.css", "otherStyle.css" ]
        },
        "title" : {
          "key" : "myservice.myprocess.title",
          "parameters" : {
            "EN" : "My process name",
            "FR" : "Mon nom de processus"
          }
        },
        "summary" : {
          "key" : "myservice.myprocess.title.summary",
          "parameters" : {
            "EN" : "Summary of card content",
            "FR" : "Resume du contenu de la carte"
          }
        },
        "recipient" : {
          "type" : "UNION",
          "recipients" : [ {
            "type" : "GROUP",
            "identity" : "myGroupA"
          }, {
            "type" : "GROUP",
            "identity" : "myGroupB"
          }, {
            "type" : "USER",
            "identity" : "aGivenUser"
          } ]
        }
      }
    },
    "Subscription" : {
      "type" : "object",
      "description" : "LightCard Subscription object",
      "properties" : {
        "rangeStart" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "subscription range start time"
        },
        "rangeEnd" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "subscription range end time"
        },
        "loadedCards" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        }
      }
    },
    "LightCard" : {
      "type" : "object",
      "description" : "LightCard bears the essential information of a Card, to be aggregated in CardOperations.",
      "readOnly" : true,
      "properties" : {
        "uid" : {
          "type" : "string",
          "description" : "Unique card ID"
        },
        "id" : {
          "type" : "string",
          "description" : "Unique card ID for associated process"
        },
        "publisher" : {
          "type" : "string",
          "description" : "Publishing service unique ID"
        },
        "publisherVersion" : {
          "type" : "string",
          "description" : "Publishing service version"
        },
        "process" : {
          "type" : "string",
          "description" : "associated process name"
        },
        "processId" : {
          "type" : "string",
          "description" : "Unique process ID of the associated process instance"
        },
        "state" : {
          "type" : "string",
          "description" : "associated process state name"
        },
        "lttd" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Last time to decide, after this date no action can be triggered on the card"
        },
        "startDate" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Card validity start time"
        },
        "endDate" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Card validity end time"
        },
        "publishDate" : {
          "$ref" : "#/definitions/EpochDate",
          "description" : "Publication time of the Card"
        },
        "severity" : {
          "$ref" : "#/definitions/SeverityEnum",
          "description" : "Card severity"
        },
        "tags" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "description" : "Tags associated with the card"
        },
        "title" : {
          "description" : "Card i18n title",
          "$ref" : "#/definitions/I18n"
        },
        "summary" : {
          "description" : "Card i18n summary",
          "$ref" : "#/definitions/I18n"
        },
        "timeSpans" : {
          "type" : "array",
          "description" : "List of business time span associated to card",
          "items" : {
            "$ref" : "#/definitions/TimeSpan"
          }
        }
      },
      "example" : {
        "uid" : 12345,
        "id" : "cardIdFromMyProcess",
        "publisher" : "MyService",
        "publisherVersion" : "0.0.1",
        "processId" : "MyProcess_001",
        "lttd" : 1546387230000,
        "startDate" : 1546387200000,
        "endDate" : 1546387250000,
        "severity" : "ACTION",
        "tags" : [ "MyService", "MyProcess" ],
        "title" : {
          "key" : "myservice.myprocess.title",
          "parameters" : {
            "EN" : "My process name",
            "FR" : "Mon nom de processus"
          }
        },
        "summary" : {
          "key" : "myservice.myprocess.title.summary",
          "parameters" : {
            "EN" : "Summary of card content",
            "FR" : "Resume du contenu de la carte"
          }
        }
      }
    },
    "LightCardPage" : {
      "type" : "object",
      "description" : "This object contains the result of a paginated query returning LightCards: a list of LightCards as well as additional information on the result: total number of items, page number, page size, etc.",
      "properties" : {
        "content" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/LightCard"
          },
          "description" : "LightCard objects making up the required result page"
        },
        "first" : {
          "type" : "boolean",
          "description" : "Is true for the first page (page number = 0)"
        },
        "last" : {
          "type" : "boolean",
          "description" : "Is true for the last page"
        },
        "totalPages" : {
          "type" : "number",
          "description" : "Total number of pages returned by the query"
        },
        "totalElements" : {
          "type" : "number",
          "description" : "Total number of elements returned by the query"
        },
        "numberOfElements" : {
          "type" : "number",
          "description" : "Number of elements in the current page"
        },
        "size" : {
          "type" : "number",
          "description" : "Page size (max number of items in page)"
        },
        "number" : {
          "type" : "number",
          "description" : "Page number"
        }
      }
    }
  },
  "paths" : {
    "/async/cards" : {
      "post" : {
        "tags" : [ "cards", "creation" ],
        "summary" : "publish cards",
        "description" : "Publish one or more cards to OperatorFabric The response for this method is always a `201` status. To make sure the cards have been published, check the count returned in the body of the request.",
        "operationId" : "publishCardsAsync",
        "consumes" : [ "application/json" ],
        "parameters" : [ {
          "name" : "cards",
          "in" : "body",
          "schema" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/definitions/Card"
            }
          }
        } ],
        "responses" : {
          "202" : {
            "description" : "accepted"
          }
        }
      }
    },
    "/cardSubscription" : {
      "get" : {
        "tags" : [ "cards", "read", "subscription" ],
        "summary" : "fetch card operations",
        "description" : "fetch cards restricted to calling user. Fetched cards all come with empty data and details. requesting this end point opens an SSE connection",
        "operationId" : "getCardSubscription",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "rangeStart",
          "type" : "string",
          "format" : "date-time",
          "in" : "query",
          "description" : "start of time range to get published card"
        }, {
          "name" : "rangeEnd",
          "type" : "string",
          "format" : "date-time",
          "in" : "query",
          "description" : "end of time range to get published card"
        }, {
          "name" : "notification",
          "type" : "boolean",
          "in" : "query",
          "default" : false,
          "description" : "If true, connection is kept for notification of new cards (not related to the specified range)"
        }, {
          "name" : "clientId",
          "type" : "string",
          "in" : "query",
          "description" : "A unique id to identify client to allow for reconnection (an autogenerated UUID is the best solution)"
        } ],
        "responses" : {
          "200" : {
            "description" : "ok",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/CardOperation"
              }
            }
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - User doesn't have any group"
          }
        }
      }
    },
    "/cardSubscription/{uiId}" : {
      "put" : {
        "tags" : [ "cards", "subscription" ],
        "summary" : "Update existing subscription",
        "description" : "Update existing subscription",
        "operationId" : "updateCardSubscription",
        "consumes" : [ "application/json" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "in" : "path",
          "name" : "uiId",
          "description" : "unique ui client id associated to subscription",
          "type" : "string",
          "required" : true
        }, {
          "in" : "body",
          "name" : "subscription",
          "description" : "updated subscription",
          "schema" : {
            "$ref" : "#/definitions/Subscription"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/Subscription"
            }
          },
          "400" : {
            "description" : "Bad request (body doesn't match login path parameter)"
          },
          "401" : {
            "description" : "Authentication required"
          },
          "404" : {
            "description" : "Subscription not found"
          }
        }
      }
    },
    "/cards" : {
      "post" : {
        "tags" : [ "cards", "creation" ],
        "summary" : "publish cards",
        "description" : "Publish one or more card to OperatorFabric. Be careful, to know if the cards were published well, then it is necessary to consult the report returned in the body of the request (do not rely only on the response code).",
        "operationId" : "publishCards",
        "consumes" : [ "application/json" ],
        "parameters" : [ {
          "name" : "cards",
          "in" : "body",
          "schema" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/definitions/Card"
            }
          }
        } ],
        "responses" : {
          "201" : {
            "description" : "created",
            "schema" : {
              "$ref" : "#/definitions/CardCreationReport"
            }
          }
        }
      }
    },
    "/archives" : {
      "get" : {
        "tags" : [ "archives", "read" ],
        "summary" : "get archived cards matching given criteria",
        "description" : "get archived cards matching the criteria given as parameters. Results are limited to the cards that the calling user is allowed to see (based on the card recipients).",
        "operationId" : "fetchArchivedCardsWithParams",
        "consumes" : [ "application/json" ],
        "parameters" : [ {
          "in" : "query",
          "name" : "page",
          "type" : "number",
          "required" : false,
          "description" : "Page number of the page to retrieve. If \"size\" is set but \"page\" isn't, the default page returned will be the first (number 0). If \"page\" is set but \"size\" isn't, the default size will be 10 items. If neither \"page\" nor \"size\" is set, the response will contain a single page containing all matching cards. This parameter should be unique or a BAD REQUEST will be returned."
        }, {
          "in" : "query",
          "name" : "size",
          "type" : "number",
          "required" : false,
          "description" : "Size of the results pages. If \"size\" is set but \"page\" isn't, the default page returned will be the first (number 0). If \"page\" is set but \"size\" isn't, the default size will be 10 items. If neither \"page\" nor \"size\" is set, the response will contain a single page containing all matching cards. This parameter should be unique or a BAD REQUEST will be returned."
        }, {
          "in" : "query",
          "name" : "publishDateFrom",
          "type" : "number",
          "required" : false,
          "description" : "Date as number of milliseconds since epoch. If this query parameter is set, only cards with a publishDate that is after this date will be returned. This parameter should be unique or a BAD REQUEST will be returned."
        }, {
          "in" : "query",
          "name" : "publishDateTo",
          "type" : "number",
          "required" : false,
          "description" : "Date as number of milliseconds since epoch. If this query parameter is set, only cards with a publishDate that is before this date will be returned. This parameter should be unique or a BAD REQUEST will be returned."
        }, {
          "in" : "query",
          "name" : "activeFrom",
          "type" : "number",
          "required" : false,
          "description" : "Date as number of milliseconds since epoch. If this query parameter is set, only cards with an active period (as defined by their startDate and endDate properties) that overlaps the range [activeFrom, activeTo] will be returned. If no parameter activeTo is set, only cards with at least part of their active period after activeFrom will be returned. This parameter should be unique or a BAD REQUEST will be returned."
        }, {
          "in" : "query",
          "name" : "activeTo",
          "type" : "number",
          "required" : false,
          "description" : "Date as number of milliseconds since epoch. If this query parameter is set, only cards with an active period (as defined by their startDate and endDate properties) that overlaps the range [activeFrom, activeTo] will be returned. If no parameter activeFrom is set, only cards with at least part of their active period before activeTo will be returned. This parameter should be unique or a BAD REQUEST will be returned."
        }, {
          "in" : "query",
          "name" : "publisher",
          "type" : "string",
          "required" : false,
          "description" : "If this parameter is set, results will be limited to cards from this publisher. This parameter can be set multiple times to filter cards from several publishers, using the following syntax: ?publisher=publisher1&publisher=publisher2"
        }, {
          "in" : "query",
          "name" : "process",
          "type" : "string",
          "required" : false,
          "description" : "If this parameter is set, results will be limited to cards from this process. This parameter can be set multiple times to filter cards from several processes, using the following syntax: ?process=process1&process=process2"
        }, {
          "in" : "query",
          "name" : "tags",
          "type" : "string",
          "required" : false,
          "description" : "If this parameter is set, results will be limited to cards containing this tag. This parameter can be set multiple times to filter cards with several tags, using the following syntax: ?tags=tag1&tags=tag2. In this example, cards bearing either tag1 or tag2 (or both) will be returned."
        }, {
          "in" : "query",
          "name" : "XXXX",
          "type" : "string",
          "required" : false,
          "description" : "In addition to the query parameters described above, any query parameter of the form ?key=value, where \"key\" is the name of a card field, will filter cards to return only cards where the field \"key\" is either equal to the string \"value\" or to an array containing \"value\". If key isn't a card property, the filter will have no effect."
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/LightCardPage"
            }
          },
          "400" : {
            "description" : "Bad request"
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - User doesn't have any group"
          }
        }
      }
    },
    "/archives/{id}" : {
      "parameters" : [ {
        "in" : "path",
        "name" : "id",
        "type" : "string",
        "required" : true
      } ],
      "get" : {
        "operationId" : "fetchArchivedCard",
        "tags" : [ "archives", "read" ],
        "summary" : "fetch archived card",
        "description" : "fetch archived card with the given id",
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/Card"
            }
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - User doesn't have any group"
          }
        }
      }
    },
    "/cards/{id}" : {
      "parameters" : [ {
        "in" : "path",
        "name" : "id",
        "type" : "string",
        "required" : true,
        "description" : "The id parameter is constructed as follows : {publisher}_{processId}"
      } ],
      "delete" : {
        "operationId" : "deleteProcessCard",
        "tags" : [ "cards", "deletion" ],
        "summary" : "delete current card",
        "description" : "delete current card for process id",
        "responses" : {
          "200" : {
            "description" : "OK"
          }
        }
      },
      "get" : {
        "operationId" : "fetchProcessCard",
        "tags" : [ "cards", "read" ],
        "summary" : "fetch current card",
        "description" : "fetch current card for process id",
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/Card"
            }
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - User doesn't have any group"
          }
        }
      }
    }
  }
}