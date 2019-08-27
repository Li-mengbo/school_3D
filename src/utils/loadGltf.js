// gltf模型加载
const gltf = [
  {
      name: 'bangonglou',
      paramCity: {
          position: new AMap.LngLat(116.647219,39.92047), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'beimen',
      paramCity: {
          position: new AMap.LngLat(116.647264,39.920496), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'caimaodalou',
      paramCity: {
          position: new AMap.LngLat(116.647296,39.92045), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'dianjiaoguan',
      paramCity: {
          position: new AMap.LngLat(116.647260,39.92047), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'guojijiaoliu',
      paramCity: {
          position: new AMap.LngLat(116.647283,39.920406), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'jiaoxuelou',
      paramCity: {
          position: new AMap.LngLat(116.647321,39.920497), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'jiashuloubei',
      paramCity: {
          position: new AMap.LngLat(116.647218,39.920448), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'xuesheng06',
      paramCity: {
          position: new AMap.LngLat(116.647223,39.92028), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'jishuzhongxin',
      paramCity: {
          position: new AMap.LngLat(116.647294,39.920429), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'kantaidong',
      paramCity: {
          position: new AMap.LngLat(116.647219,39.92047), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'kantaixi',
      paramCity: {
          position: new AMap.LngLat(116.647219,39.92047), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'menwei',
      paramCity: {
          position: new AMap.LngLat(116.647219,39.92047), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'shibei',
      paramCity: {
          position: new AMap.LngLat(116.647284,39.920450), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'shitang',
      paramCity: {
          position: new AMap.LngLat(116.647219,39.92047), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'tushuguan',
      paramCity: {
          position: new AMap.LngLat(116.647226,39.920474), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'xuesheng01',
      paramCity: {
          position: new AMap.LngLat(116.647273,39.920418), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'xuesheng02',
      paramCity: {
          position: new AMap.LngLat(116.647175,39.920417), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'xuesheng03',
      paramCity: {
          position: new AMap.LngLat(116.647278,39.921155), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'xuesheng04',
      paramCity: {
          position: new AMap.LngLat(116.647186,39.921155), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'xuesheng05',
      paramCity: {
          position: new AMap.LngLat(116.647169,39.920417), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
      name: 'jiashulounan',
      paramCity: {
          position: new AMap.LngLat(116.647267,39.9205), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'shuiba',
      paramCity: {
          position: new AMap.LngLat(116.647378,39.920336), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  }, 
  {
      name: 'xueshengzhongxin',
      paramCity: {
          position: new AMap.LngLat(116.647265,39.920376), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
  },
  {
    name: 'lanqiuchang',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'beimenzuo',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'guojijiaoliupang',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'lianhuakantai',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'light',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'qiaoer',
    paramCity: {
        position: new AMap.LngLat(116.647169,39.920417), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
},
{
    name: 'qiaosan',
    paramCity: {
        position: new AMap.LngLat(116.647267,39.9205), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
}, 
{
    name: 'qiaoyi',
    paramCity: {
        position: new AMap.LngLat(116.647378,39.920336), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
}, 
{
    name: 'shangyuan',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
},
{
  name: 'shifang',
  paramCity: {
      position: new AMap.LngLat(116.647265,39.920376), // 必须
      scale: 70, // 非必须，默认1
      height: 0,  // 非必须，默认0
      scene: 0, // 非必须，默认0
  }
},
{
  name: 'shuita',
  paramCity: {
      position: new AMap.LngLat(116.647265,39.920376), // 必须
      scale: 70, // 非必须，默认1
      height: 0,  // 非必须，默认0
      scene: 0, // 非必须，默认0
  }
},
{
  name: 'weimingming',
  paramCity: {
      position: new AMap.LngLat(116.647265,39.920376), // 必须
      scale: 70, // 非必须，默认1
      height: 0,  // 非必须，默认0
      scene: 0, // 非必须，默认0
  }
},
{
  name: 'weimingmingpang',
  paramCity: {
      position: new AMap.LngLat(116.647265,39.920376), // 必须
      scale: 70, // 非必须，默认1
      height: 0,  // 非必须，默认0
      scene: 0, // 非必须，默认0
  }
},
{
  name: 'zuoer',
  paramCity: {
      position: new AMap.LngLat(116.647265,39.920376), // 必须
      scale: 70, // 非必须，默认1
      height: 0,  // 非必须，默认0
      scene: 0, // 非必须，默认0
  }
},
{
    name: 'zuoyi',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'weiqiang01',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'weiqiang02',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'weiqiang03',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'weiqiang04',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
    name: 'weiqiang05',
    paramCity: {
        position: new AMap.LngLat(116.647265,39.920376), // 必须
        scale: 70, // 非必须，默认1
        height: 0,  // 非必须，默认0
        scene: 0, // 非必须，默认0
    }
  },
  {
      name: 'weiqiang06',
      paramCity: {
          position: new AMap.LngLat(116.647265,39.920376), // 必须
          scale: 70, // 非必须，默认1
          height: 0,  // 非必须，默认0
          scene: 0, // 非必须，默认0
      }
    },
    // {
    //     name: 'tree',
    //     paramCity: {
    //         position: new AMap.LngLat(116.647265,39.920376), // 必须
    //         scale: 70, // 非必须，默认1
    //         height: 0,  // 非必须，默认0
    //         scene: 0, // 非必须，默认0
    //     }
    // }  
//   {
//     name: 'untitled',
//     paramCity: {
//         position: new AMap.LngLat(116.647265,39.920376), // 必须
//         scale: 70, // 非必须，默认1
//         height: 0,  // 非必须，默认0
//         scene: 0, // 非必须，默认0
//     }
//   },
//   {
//     name: 'untitled01',
//     paramCity: {
//         position: new AMap.LngLat(116.647265,39.920376), // 必须
//         scale: 70, // 非必须，默认1
//         height: 0,  // 非必须，默认0
//         scene: 0, // 非必须，默认0
//     }
//   }               
]

export default gltf;