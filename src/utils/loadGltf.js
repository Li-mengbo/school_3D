// gltf模型加载
let gltf;
if(navigator.userAgent.indexOf('iPhone') != -1){
    console.log('iphone')
    gltf = [
        {
            name: 'bangonglou'
        }, 
        {
            name: 'beimen'
        },
        {
            name: 'caimaodalou'
        }, 
        {
            name: 'dianjiaoguan'
        },
        {
            name: 'guojijiaoliu'
        }, 
        {
            name: 'jiaoxuelou'
        },
        {
            name: 'jiashuloubei'
        }, 
        {
            name: 'xuesheng06'
        },
        {
            name: 'jishuzhongxin'
        }, 
        {
            name: 'kantaidong'
        },
        {
            name: 'kantaixi'
        }, 
        {
            name: 'menwei'
        }, 
        {
            name: 'shibei'
        },
        {
            name: 'shitang'
        }, 
        {
            name: 'tushuguan'
        }, 
        {
            name: 'xuesheng01'
        },
        {
            name: 'xuesheng02'
        }, 
        {
            name: 'xuesheng03'
        },
        {
            name: 'xuesheng04'
        }, 
        {
            name: 'xuesheng05'
        },
        {
            name: 'jiashulounan'
        }, 
        {
            name: 'shuiba',
        }, 
        {
            name: 'xueshengzhongxin'
        },
        {
          name: 'lanqiuchang'
        },
        // {
        //   name: 'beimenzuo'
        // },
        // {
        //   name: 'guojijiaoliupang'
        // },
      //   {
      //     name: 'lianhuakantai'
      //   },
      //   {
      //     name: 'light'
      //   },
      //   {
      //     name: 'qiaoer'
      // },
      // {
      //     name: 'qiaosan'
      // }, 
      // {
      //     name: 'qiaoyi'
      // }, 
      {
          name: 'shangyuan'
      },
    //   {
    //     name: 'shifang'
    //   },
       {
        name: 'shuita'
      },
      // {
      //   name: 'weimingming'
      // },
      // {
      //   name: 'weimingmingpang'
      // },
      // {
      //   name: 'zuoer'
      // },
      // {
      //     name: 'zuoyi'
      //   },
         {
          name: 'weiqiang01'
        },
        {
          name: 'weiqiang02'
        },
        {
          name: 'weiqiang03'
        },
        {
          name: 'weiqiang04'
        },
        {
          name: 'weiqiang05'
        },
        {
            name: 'weiqiang06'
          },             
      ]
}else {
    console.log('安卓')
    gltf = [
        {
            name: 'bangonglou'
        }, 
        {
            name: 'beimen'
        },
        {
            name: 'caimaodalou'
        }, 
        {
            name: 'dianjiaoguan'
        },
        {
            name: 'guojijiaoliu'
        }, 
        {
            name: 'jiaoxuelou'
        },
        {
            name: 'jiashuloubei'
        }, 
        {
            name: 'xuesheng06'
        },
        {
            name: 'jishuzhongxin'
        }, 
        {
            name: 'kantaidong'
        },
        {
            name: 'kantaixi'
        }, 
        {
            name: 'menwei'
        }, 
        {
            name: 'shibei'
        },
        {
            name: 'shitang'
        }, 
        {
            name: 'tushuguan'
        }, 
        {
            name: 'xuesheng01'
        },
        {
            name: 'xuesheng02'
        }, 
        {
            name: 'xuesheng03'
        },
        {
            name: 'xuesheng04'
        }, 
        {
            name: 'xuesheng05'
        },
        {
            name: 'jiashulounan'
        }, 
        {
            name: 'shuiba',
        }, 
        {
            name: 'xueshengzhongxin'
        },
        {
          name: 'lanqiuchang'
        },
        {
          name: 'beimenzuo'
        },
        {
          name: 'guojijiaoliupang'
        },
        {
          name: 'lianhuakantai'
        },
        {
          name: 'light'
        },
        {
          name: 'qiaoer'
      },
      {
          name: 'qiaosan'
      }, 
      {
          name: 'qiaoyi'
      }, 
      {
          name: 'shangyuan'
      },
      {
        name: 'shifang'
      },
       {
        name: 'shuita'
      },
      {
        name: 'weimingming'
      },
      {
        name: 'weimingmingpang'
      },
      {
        name: 'zuoer'
      },
      {
          name: 'zuoyi'
      },
      {
          name: 'weiqiang01'
      },
      {
            name: 'weiqiang02'
      },
      {
            name: 'weiqiang03'
      },
      {
            name: 'weiqiang04'
      },
      {
            name: 'weiqiang05'
      },
      {
        name: 'weiqiang06'
      },             
    ]
}


export default gltf;