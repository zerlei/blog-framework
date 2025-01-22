---
export: true
tags:
    - linux
keys:
    - ubuntu
---

::: info Introduction

滚动版发行的opensuse tumbleweed 可以获得最新的软件包，相比其它常规发布版本的Linux， 这对于开发和学习非常有用，但是腾讯云的轻量云服务器默认不提供 opensuse 系统，所以需要折腾一下。

:::

**！！！安装之前记得备份重要数据！！！**

## 概念

**VNC**: 简单来说，就是 我们登陆云服务器是一般是使用ssh登陆的，但是在系统未启动时或者启动失败时，我们与系统交互怎么办？ `vnc`就相当于给云服务器装一个远程可以看到的显示屏，差不多就这个样子。 

**GRUB**: BIOS引导启动项，这个的作用是可以选择电脑启动时加载哪个启动项，比如:如果你的电脑上装了两个系统，`grub` 可以让你选择启动哪一个系统。

[**netboot**](https://netboot.xyz): 我们重装系统通常会制作一个usb启动盘，但是云服务器没办法使用usb怎么办？ netboot 就是用网路“伪装”一个启动盘，我们可以借助netboot去在线安装系统。

所以在云服务器装厂商不提供的操作系统的流程是：

- 使用vnc登录云服务器
- 安装netboot,修改grub配置
- 在netboot 启动设置里选择要安装的系统
- 进入你熟悉的系统安装流程

## 安装netboot 和设置grub 启动

netboot 支持多种booting方式，我使用grub，这个简单。

首先，修改grub的配置，要做的是把grub启动菜单显示出来

```bash
cd /etc/default

su

vim grub
# 修改下面这个变量不为0，这是菜单出现的时间。
GRUB_TIMEOUT=5
# 你可能也需要将下面这行注释
# GRUB_TIMEOUT_STYLE=hidden
```

 [这里](https://www.gnu.org/software/grub/grub-documentation.html)查看grub文档。

接下来安装netboot, 参考[这里](https://netboot.xyz/docs/booting/grub)

```bash
# Install grub-imageboot
apt install grub-imageboot

# Download netboot.xyz ISO
mkdir /boot/images
cd /boot/images
wget https://boot.netboot.xyz/ipxe/netboot.xyz.iso

# Update GRUB menu to include this ISO
update-grub2
reboot
```

之后等待重启，在grub 选项中选择使用netboot启动系统就可以了

## opensuse tumbleweed 的安装

在netboot的选项中，你可以看到opensuse 的选项，但是因为网络原因(？）直接选opensuse 基本是不行的，这里要使用ipxe脚本定义安装源和参数。

下面这段脚本来自于[opensuse forum](https://forum.suse.org.cn/t/topic/13893)，作者是PoisonBCat 🙇‍。

不过需要注意的是，现在清华源的网站似乎不是 [http://opentuna.cn/opensuse](http://opentuna.cn/opensuse) 了，而是[http://opentuna.cn/opensuse](http://opentuna.cn/opensuse)。但是我使用国内清华源，后面安装opensuse 的时候出现了一些包找不到的错误，`不知道发生什么事了`。所以我最终使用官方源 [https://download.opensuse.org/tumbleweed/repo/oss/](https://download.opensuse.org/tumbleweed/repo/oss/)  嗯 这个慢，而且需要一直retry retry...

在grub 菜单中，选择ipxe shell, 然后根据下面的命令一条一回车就行。 **注意，下面脚本的源不能用了，根据你的情况使用正确的源，我用的是官方源**

```bash
# 如果你要安装 TW,输入
set dir tumbleweed/repo/oss
# 如果你要安装 leap,输入
set opensuse_base_dir distribution/leap
set version 15.3 # 这里写你想装的版本
set dir ${opensuse_base_dir}/${version}/repo/oss

##### 以下为通用内容 #####
set netsetup netsetup=dhcp
set opensuse_mirror http://opentuna.cn/opensuse

imgfree
kernel ${opensuse_mirror}/${dir}/boot/x86_64/loader/linux

initrd ${opensuse_mirror}/${dir}/boot/x86_64/loader/initrd

imgargs linux ${netsetup} install=${opensuse_mirror}/${dir} initrd=initrd noapic useSSH=1 SSHpassword="pa33w0rd"  ## 密码随便，如果启动的时候 kernel panic,去掉 noapic 再试一次
boot
```

之后就进入opensuse 的安装流程了，基本按照提示装就行，因为我用的是官方源，网络问题，所以要一直retry retry retry.... 

系统装完之后，在加上我重新安装我需要的包，我总共花了3个多小时，一下午就这么没了。


## 结果

opensuse tumbleweed 还是很香的，我的云服务器不是作为生产使用，所以咋折腾都可以，生产还是建议使用稳定的系统版本比较好。

我使用云服务器做开发使用，若不用滚动发行版，使用最新的软件包要么找最新的源或者手动安装，要么使用homebrew，自己找源太麻烦了，homebrew 不建议在linux上使用，它经常会造成一些依赖问题。dev containers? 我就自己开发用，而且云服务器资源就那么点，还是算了吧~

用的内存明显比ubuntu少，少了腾讯云的监控客户端的原因？

![请在此添加图片描述](https://cloud.zerlei.cn/f/WqFJ/20240706-28d90591.png)

另外，控制台监控面板看不到一些监控数据了，不过本来也没什么用。

![请在此添加图片描述](https://cloud.zerlei.cn/f/MyIz/20240706-b00a4015.png)
