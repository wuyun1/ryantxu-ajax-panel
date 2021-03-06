'use strict';

System.register(['app/plugins/sdk', 'lodash', 'app/core/utils/kbn', 'app/core/time_series', 'moment', './css/ajax-panel.css!'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, _, kbn, TimeSeries, moment, _createClass, panelDefaults, AjaxCtrl;
  var apiurl = "http://localhost:6969";
  var productMap = {
      'baomoiapisoccer': {
        'url' : '/baomoiapisoccer',
        'secret_key': 'a5sDG2stAtiC'
      },
      'epi_baomoi': {
        'url' : '/epi/baomoi',
        'secret_key': 'iGhefr3itioghao7aegh'
      },
      'epi_baomoi_v2': {
        'url' : '/epi/baomoi_v2',
        'secret_key': 'iGhefr3itioghao7aegh'
      },
      'epi_cms': {
        'url': '/epi/cms',
        'secret_key': 'iGhefr3itioghao7aegh'
      },
      'epi_static_baomoi': {
        'url': '/epi/static_baomoi',
        'secret_key': 'iGhefr3itioghao7aegh'
      },
      'epi_static_baomoi_v2': {
        'url': '/epi/static_baomoi_v2',
        'secret_key': 'iGhefr3itioghao7aegh'
      },
      'epi_static_cms': {
        'url': '/epi/static_cms',
        'secret_key': 'iGhefr3itioghao7aegh'
      },
      'farm_a1': {
        'url': '/ztv',    
        'secret_key': 'abcDADdr4a'
      },
      'g2main': {
        'url': '/g2/main',    
        'secret_key': 'a5sDG2stAtiC'
      },
      'g2mix': {
        'url': '/g2/mix',    
        'secret_key': 'a5sDG2stAtiC'
      },
      'img_znews': {
        'url': '/imgnews',    
        'secret_key': 'a5sDG2stAtiC'
      },
      'mp3_mobile_api_cache': {
        'url': '/mp3/mobile_api',    
        'secret_key': 'ahdaeduinei4Ohquohk0'
      },
      'mp3_web_cache': {
        'url': '/mp3/web',    
        'secret_key': 'ahdaeduinei4Ohquohk0'
      },
      'news': {
        'url': '/news',
        'secret_key': 'abcDADdr4a'
      },
      'trithuctruyen': {
        'url': '/news',
        'secret_key': ''
      },
      'zaloapi': {
        'url': '/zalo/api',
        'secret_key': 'ahdaeduinei4Ohquohk0'
      },
      'zaloavatar': {
        'url': '/zalo/avatar',
        'secret_key': 'ahdaeduinei4Ohquohk0'
      },
      'ztv_cache_nologin': {
        'url': '/ztvfrontend/cache_nologin',
        'secret_key': 'abcDADdr4a'
      }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_cssAjaxPanelCss) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
        // method: 'POST',
        // url: 'http://localhost:6969',
        // errorMode: 'show',
        // params_js: "{\n" + " from:ctrl.range.from.format('x'),  // x is unix ms timestamp\n" + " to:ctrl.range.to.format('x'), \n" + " height:ctrl.height\n" + "}",
        // display_js: null
      };

      _export('AjaxCtrl', AjaxCtrl = function (_MetricsPanelCtrl) {
        _inherits(AjaxCtrl, _MetricsPanelCtrl);

        // constructor($scope, $injector, private templateSrv, private $sce) {
        function AjaxCtrl($scope, $injector, templateSrv, $sce, $http) {
          _classCallCheck(this, AjaxCtrl);

          var _this = _possibleConstructorReturn(this, (AjaxCtrl.__proto__ || Object.getPrototypeOf(AjaxCtrl)).call(this, $scope, $injector));

          _this.$sce = $sce;
          _this.$http = $http;
          _this.templateSrv = templateSrv;

          _.defaults(_this.panel, panelDefaults);
          _.defaults(_this.panel.timeSettings, panelDefaults.timeSettings);

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('panel-initialized', _this.onPanelInitalized.bind(_this));
          // _this.events.on('refresh', _this.onRefresh.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));
          return _this;
        }

        // This just skips trying to send the actual query.  perhaps there is a better way


        _createClass(AjaxCtrl, [{
          key: 'issueQueries',
          value: function issueQueries(datasource) {
            this.updateTimeRange();

            // console.log('block issueQueries', datasource);
          }
        }, {
          key: 'onPanelInitalized',
          value: function onPanelInitalized() {
            this.updateFN();
          }
        }, {
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.editorTabs.splice(1, 1); // remove the 'Metrics Tab'
            this.addEditorTab('Options', 'public/plugins/' + this.pluginId + '/editor.html', 1);
            this.editorTabIndex = 1;

            this.updateFN();
          }
        }, {
          key: 'onPanelTeardown',
          value: function onPanelTeardown() {
            // this.$timeout.cancel(this.nextTickPromise);
          }
        }, {
          key: 'updateFN',
          value: function updateFN() {
            this.params_fn = null;
            this.display_fn = null;

            // if (this.panel.params_js) {
            //   try {
            //     this.params_fn = new Function('ctrl', 'return ' + this.panel.params_js);
            //   } catch (ex) {
            //     console.warn('error parsing params_js', this.panel.params_js, ex);
            //     this.params_fn = null;
            //   }
            // }

            // NOTE, this is not exposed yet
            // if (this.panel.display_js) {
            //   try {
            //     this.display_fn = new Function('ctrl', 'response', this.panel.display_js);
            //   } catch (ex) {
            //     console.warn('error parsing display_js', this.panel.display_js, ex);
            //     this.display_fn = null;
            //   }
            // }

            // this.onRefresh();
          }
        }, {
          key: 'onRefresh',
          value: function onRefresh() {
            this.updateTimeRange(); // needed for the first call
            var self = this;
            var product = this.panel.product;
            var params = {
                  link_arr: this.panel.params_js,
                  linkArr: this.panel.params_js,
                  secret_key: productMap[product].secret_key,
                  debug: 1
            }; 
            // console.log(params)
            //Duplicate:

            this.$http({
              method: "POST",
              url: this.panel.url,
              params: params
            }).then(function successCallback(response) {
              //console.log('success', response, self);
              // var html = response.data;
              // if (self.display_fn) {
              //   html = self.display_fn(self, response);
              // }
              // console.log(response)
              var body = '<h1>Result</h1> <pre>' + "Status: " + response.data.status + '\n' + "MSG: \n" + response.data.msg.replace(/<head>/g, "<_head>").replace(/<meta/g, "<_meta") + '</pre>'
              self.updateContent(body);
            }, function errorCallback(response) {
              console.log('error', response);
              var body = ""
              if (response.data != null){
                body = '<h1>Error</h1> <pre>' + "Status: " + response.data.status + '\n' + "MSG: \n" + response.data.msg.replace(/<head>/g, "<_head>").replace(/<meta/g, "<_meta") + '</pre>'  
              }else{
                body = "Error request to api, contact admin for more details"
              }
              
              self.updateContent(body);
            });
          }
        }, {
          key: "refreshUrl",
          value: function refreshUrl(){
            var product = this.panel.product
            var url = productMap[product].url;
            this.panel.url = apiurl + url;
            // console.log("product: ", product)
            // console.log("api link: ", this.panel.url)
          }
        }, {
          key: 'updateContent',
          value: function updateContent(html) {
            try {
              this.content = this.$sce.trustAsHtml(this.templateSrv.replace(html, this.panel.scopedVars));
            } catch (e) {
              // console.log('Text panel error: ', e);
              this.content = this.$sce.trustAsHtml(html);
            }
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            //console.log('render', this);
          }
        }]);

        return AjaxCtrl;
      }(MetricsPanelCtrl));

      _export('AjaxCtrl', AjaxCtrl);

      AjaxCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=ajax_ctrl.js.map
