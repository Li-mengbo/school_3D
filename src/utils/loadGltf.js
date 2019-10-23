// gltf模型加载
let gltf;

if(navigator.userAgent.indexOf('iPhone') != -1){
    console.log('iphone')
    gltf = [
        {
            name: 'bangonglou',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920485), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'beimen',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920525), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'caimaodalou',
            paramCity: {
                position: new AMap.LngLat(116.647319,39.920425), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'dianjiaoguan',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920485), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'guojijiaoliu',
            paramCity: {
                position: new AMap.LngLat(116.647419,39.920425), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'jiaoxuelou',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920485), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'jiashuloubei',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920455), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'xuesheng06',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920465), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'jishuzhongxin',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920485), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'kantaidong',
            paramCity: {
                position: new AMap.LngLat(116.647309,39.920455), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'kantaixi',
            paramCity: {
                position: new AMap.LngLat(116.647269,39.920475), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'menwei',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920525), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'shibei',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920485), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'shitang',
            paramCity: {
                position: new AMap.LngLat(116.647370,39.920385), // 必须
                scale: 66, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'tushuguan',
            paramCity: {
                position: new AMap.LngLat(116.647359,39.920455), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'xuesheng01',
            paramCity: {
                position: new AMap.LngLat(116.647369,39.920410), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'xuesheng02',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920410), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'xuesheng03',
            paramCity: {
                position: new AMap.LngLat(116.647369,39.920475), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'xuesheng04',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920475), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'xuesheng05',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920415), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
            name: 'jiashulounan',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920455), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'shuiba',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920445), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        }, 
        {
            name: 'xueshengzhongxin',
            paramCity: {
                position: new AMap.LngLat(116.647389,39.920385), // 必须
                scale: 70, // 非必须，默认1
                height: 0,  // 非必须，默认0
                scene: 0, // 非必须，默认0
            }
        },
        {
          name: 'lanqiuchang',
          paramCity: {
            position: new AMap.LngLat(116.647369,39.920435), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
            }
        },
        {
          name: 'beimenzuo',
          paramCity: {
            position: new AMap.LngLat(116.647399,39.920530), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
        },
        // {
        //   name: 'guojijiaoliupang'
        // },
        {
          name: 'lianhuakantai',
          paramCity: {
            position: new AMap.LngLat(116.647339,39.920485), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
        },
      //   {
      //     name: 'light'
      //   },
      {
        name: 'qiaoer',
        paramCity: {
          position: new AMap.LngLat(116.647369,39.920535), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      // {
      //     name: 'qiaosan'
      // }, 
      // {
      //     name: 'qiaoyi'
      // }, 
      {
          name: 'shangyuan',
          paramCity: {
            position: new AMap.LngLat(116.647389,39.920485), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
        }
      },
      {
        name: 'shifang',
        paramCity: {
          position: new AMap.LngLat(116.647419,39.920519), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
       {
        name: 'shuita',
        paramCity: {
            position: new AMap.LngLat(116.647309,39.920425), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
        }
      },
      {
        name: 'weimingming',
        paramCity: {
          position: new AMap.LngLat(116.647349,39.920445), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      {
        name: 'weimingmingpang',
        paramCity: {
          position: new AMap.LngLat(116.647339,39.920455), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      {
        name: 'zuoer',
        paramCity: {
          position: new AMap.LngLat(116.647339,39.920520), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      {
          name: 'zuoyi',
          paramCity: {
            position: new AMap.LngLat(116.647339,39.920485), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
      },
        //  {
        //   name: 'weiqiang01',
        //   paramCity: {
        //     position: new AMap.LngLat(116.647389,39.920485), // 必须
        //     scale: 70, // 非必须，默认1
        //     height: 0,  // 非必须，默认0
        //     scene: 0, // 非必须，默认0
        //     }
        // },
        // {
        //   name: 'weiqiang02',
        //   paramCity: {
        //     position: new AMap.LngLat(116.647389,39.920485), // 必须
        //     scale: 70, // 非必须，默认1
        //     height: 0,  // 非必须，默认0
        //     scene: 0, // 非必须，默认0
        //   }
        // },
        // {
        //   name: 'weiqiang03',
        //   paramCity: {
        //     position: new AMap.LngLat(116.647389,39.920485), // 必须
        //     scale: 70, // 非必须，默认1
        //     height: 0,  // 非必须，默认0
        //     scene: 0, // 非必须，默认0
        //   }
        // },
        // {
        //   name: 'weiqiang04',
        //   paramCity: {
        //     position: new AMap.LngLat(116.647389,39.920485), // 必须
        //     scale: 70, // 非必须，默认1
        //     height: 0,  // 非必须，默认0
        //     scene: 0, // 非必须，默认0
        //   }          
        // },
        // {
        //   name: 'weiqiang05',
        //   paramCity: {
        //     position: new AMap.LngLat(116.647389,39.920485), // 必须
        //     scale: 70, // 非必须，默认1
        //     height: 0,  // 非必须，默认0
        //     scene: 0, // 非必须，默认0
        //   }          
        // },
        // {
        //     name: 'weiqiang06',
        //     paramCity: {
        //       position: new AMap.LngLat(116.647389,39.920485), // 必须
        //       scale: 70, // 非必须，默认1
        //       height: 0,  // 非必须，默认0
        //       scene: 0, // 非必须，默认0
        //     }          
        //   },             
      ]
}else {
    console.log('安卓')
    gltf = [
        {
            name: 'bangonglou',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920485), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'beimen',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920525), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'caimaodalou',
            paramCity: {
              position: new AMap.LngLat(116.647319,39.920425), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'dianjiaoguan',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920485), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'guojijiaoliu',
            paramCity: {
              position: new AMap.LngLat(116.647419,39.920425), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'jiaoxuelou',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920485), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'jiashuloubei',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920455), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'xuesheng06',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920465), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'jishuzhongxin',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920485), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'kantaidong',
            paramCity: {
              position: new AMap.LngLat(116.647309,39.920455), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'kantaixi',
            paramCity: {
              position: new AMap.LngLat(116.647269,39.920475), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'menwei',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920525), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'shibei',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920485), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'shitang',
            paramCity: {
              position: new AMap.LngLat(116.647370,39.920385), // 必须
              scale: 66, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'tushuguan',
            paramCity: {
              position: new AMap.LngLat(116.647359,39.920455), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'xuesheng01',
            paramCity: {
              position: new AMap.LngLat(116.647369,39.920410), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'xuesheng02',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920410), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'xuesheng03',
            paramCity: {
              position: new AMap.LngLat(116.647369,39.920475), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'xuesheng04',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920475), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'xuesheng05',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920415), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
            name: 'jiashulounan',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920455), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'shuiba',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.920445), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        }, 
        {
            name: 'xueshengzhongxin',
            paramCity: {
              position: new AMap.LngLat(116.647389,39.9204385), // 必须
              scale: 70, // 非必须，默认1
              height: 0,  // 非必须，默认0
              scene: 0, // 非必须，默认0
            }          
        },
        {
          name: 'lanqiuchang',
          paramCity: {
            position: new AMap.LngLat(116.647369,39.920435), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
        },
        {
          name: 'beimenzuo',
          paramCity: {
            position: new AMap.LngLat(116.647399,39.920530), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
        },
        {
          name: 'guojijiaoliupang',
          paramCity: {
            position: new AMap.LngLat(116.647389,39.920395), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
        },
        {
          name: 'lianhuakantai',
          paramCity: {
            position: new AMap.LngLat(116.647339,39.920485), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
        },
        // {
        //   name: 'light',
        //   paramCity: {
        //     position: new AMap.LngLat(116.647389,39.920485), // 必须
        //     scale: 70, // 非必须，默认1
        //     height: 0,  // 非必须，默认0
        //     scene: 0, // 非必须，默认0
        //   }          
        // },
        {
          name: 'qiaoer',
          paramCity: {
            position: new AMap.LngLat(116.647369,39.920535), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
      },
      {
          name: 'qiaosan',
          paramCity: {
            position: new AMap.LngLat(116.647359,39.920520), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
      }, 
      {
          name: 'qiaoyi',
          paramCity: {
            position: new AMap.LngLat(116.647389,39.920485), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
      }, 
      {
          name: 'shangyuan',
          paramCity: {
            position: new AMap.LngLat(116.647389,39.920485), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
      },
      {
        name: 'shifang',
        paramCity: {
          position: new AMap.LngLat(116.647419,39.920519), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
       {
        name: 'shuita',
        paramCity: {
          position: new AMap.LngLat(116.647309,39.920425), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      {
        name: 'weimingming',
        paramCity: {
          position: new AMap.LngLat(116.647349,39.920445), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      {
        name: 'weimingmingpang',
        paramCity: {
          position: new AMap.LngLat(116.647339,39.920455), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      {
        name: 'zuoer',
        paramCity: {
          position: new AMap.LngLat(116.647339,39.920520), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
        }          
      },
      {
          name: 'zuoyi',
          paramCity: {
            position: new AMap.LngLat(116.647339,39.920485), // 必须
            scale: 70, // 非必须，默认1
            height: 0,  // 非必须，默认0
            scene: 0, // 非必须，默认0
          }          
      },
      // {
      //     name: 'weiqiang01',
      //     paramCity: {
      //       position: new AMap.LngLat(116.647389,39.920485), // 必须
      //       scale: 70, // 非必须，默认1
      //       height: 0,  // 非必须，默认0
      //       scene: 0, // 非必须，默认0
      //     }          
      // },
      // {
      //       name: 'weiqiang02',
      //       paramCity: {
      //         position: new AMap.LngLat(116.647389,39.920485), // 必须
      //         scale: 70, // 非必须，默认1
      //         height: 0,  // 非必须，默认0
      //         scene: 0, // 非必须，默认0
      //       }          
      // },
      // {
      //       name: 'weiqiang03',
      //       paramCity: {
      //         position: new AMap.LngLat(116.647389,39.920485), // 必须
      //         scale: 70, // 非必须，默认1
      //         height: 0,  // 非必须，默认0
      //         scene: 0, // 非必须，默认0
      //       }          
      // },
      // {
      //       name: 'weiqiang04',
      //       paramCity: {
      //         position: new AMap.LngLat(116.647389,39.920485), // 必须
      //         scale: 70, // 非必须，默认1
      //         height: 0,  // 非必须，默认0
      //         scene: 0, // 非必须，默认0
      //       }          
      // },
      // {
      //       name: 'weiqiang05',
      //       paramCity: {
      //         position: new AMap.LngLat(116.647389,39.920485), // 必须
      //         scale: 70, // 非必须，默认1
      //         height: 0,  // 非必须，默认0
      //         scene: 0, // 非必须，默认0
      //       }          
      // },
      // {
      //   name: 'weiqiang06',
      //   paramCity: {
      //     position: new AMap.LngLat(116.647389,39.920485), // 必须
      //     scale: 70, // 非必须，默认1
      //     height: 0,  // 非必须，默认0
      //     scene: 0, // 非必须，默认0
      //   }          
      // },             
    ]
}

export default gltf;