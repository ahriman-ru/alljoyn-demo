LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)

LOCAL_MODULE := alljoyn
LOCAL_CFLAGS := -DNDEBUG
LOCAL_LDLIBS := \
	-llog \

LOCAL_SRC_FILES := \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_about.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_bufio.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_bus.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_cert.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_connect.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_crc16.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_creds.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_crypto.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_crypto_ecc.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_crypto_sha2.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_debug.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_disco.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_guid.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_helper.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_init.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_introspect.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_keyauthentication.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_keyexchange.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_link_timeout.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_msg.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_net.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_nvram.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_peer.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_serial.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_serial_rx.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_serial_tx.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_std.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_sw_crypto.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_target_crypto.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_target_nvram.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_target_util.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\aj_util.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\alljoyn_wrap.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\ifaddrs.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\ifc_utils.c \
	C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni\sha2.c \

LOCAL_C_INCLUDES += C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\main\jni
LOCAL_C_INCLUDES += C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\x86\jni
LOCAL_C_INCLUDES += C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\release\jni
LOCAL_C_INCLUDES += C:\temp\alljoyn-demo\CordovaLightingApp\platforms\android\AllJoynLib\src\x86Release\jni

include $(BUILD_SHARED_LIBRARY)
